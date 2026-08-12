<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $success, string $message): never
{
    http_response_code($status);
    echo json_encode(
        ['success' => $success, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function text_value(array $payload, string $key): string
{
    $value = $payload[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function contains_header_break(string $value): bool
{
    return preg_match('/[\r\n]/', $value) === 1;
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function load_private_config(): array
{
    $configuredPath = getenv('BAI_MAIL_CONFIG');
    $documentRoot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), DIRECTORY_SEPARATOR);
    $candidates = array_filter([
        is_string($configuredPath) ? $configuredPath : '',
        $documentRoot !== '' ? dirname($documentRoot) . '/private/mail-config.php' : '',
        dirname(__DIR__, 2) . '/server/private/mail-config.php',
    ]);

    foreach ($candidates as $path) {
        if (is_file($path) && is_readable($path)) {
            $config = require $path;
            if (is_array($config)) return $config;
        }
    }

    return [];
}

function load_phpmailer(array $config): bool
{
    $documentRoot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), DIRECTORY_SEPARATOR);
    $candidates = array_filter([
        isset($config['vendor_autoload']) && is_string($config['vendor_autoload']) ? $config['vendor_autoload'] : '',
        $documentRoot !== '' ? dirname($documentRoot) . '/private/vendor/autoload.php' : '',
        dirname(__DIR__, 2) . '/server/vendor/autoload.php',
    ]);

    foreach ($candidates as $path) {
        if (is_file($path) && is_readable($path)) {
            require_once $path;
            return class_exists(PHPMailer::class);
        }
    }

    return false;
}

function enforce_same_origin(array $config): void
{
    $allowedOrigins = $config['allowed_origins'] ?? ['https://baikonsultan.com'];
    if (!is_array($allowedOrigins) || $allowedOrigins === []) {
        $allowedOrigins = ['https://baikonsultan.com'];
    }

    $origin = trim((string) ($_SERVER['HTTP_ORIGIN'] ?? ''));
    if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
        respond(403, false, 'Permintaan tidak diizinkan.');
    }

    if ($origin === '') {
        $referer = trim((string) ($_SERVER['HTTP_REFERER'] ?? ''));
        if ($referer !== '') {
            $parts = parse_url($referer);
            $refererOrigin = isset($parts['scheme'], $parts['host'])
                ? $parts['scheme'] . '://' . $parts['host'] . (isset($parts['port']) ? ':' . $parts['port'] : '')
                : '';
            if ($refererOrigin === '' || !in_array($refererOrigin, $allowedOrigins, true)) {
                respond(403, false, 'Permintaan tidak diizinkan.');
            }
        }
    }
}

function enforce_rate_limit(): void
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . '/bai-contact-rate-limit';
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) return;

    $file = $directory . '/' . hash('sha256', $ip) . '.json';
    $handle = @fopen($file, 'c+');
    if ($handle === false) return;

    try {
        if (!flock($handle, LOCK_EX)) return;
        $stored = stream_get_contents($handle);
        $timestamps = is_string($stored) && $stored !== '' ? json_decode($stored, true) : [];
        if (!is_array($timestamps)) $timestamps = [];

        $now = time();
        $windowStart = $now - 600;
        $timestamps = array_values(array_filter($timestamps, static fn ($time) => is_int($time) && $time >= $windowStart));

        if (count($timestamps) >= 3) {
            flock($handle, LOCK_UN);
            header('Retry-After: 600');
            respond(429, false, 'Terlalu banyak percobaan. Silakan tunggu beberapa menit lalu coba kembali.');
        }

        $timestamps[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($timestamps));
        fflush($handle);
        flock($handle, LOCK_UN);
    } finally {
        fclose($handle);
    }
}

function create_mailer(array $config): PHPMailer
{
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = (string) $config['smtp_host'];
    $mail->Port = (int) $config['smtp_port'];
    $mail->SMTPAuth = true;
    $mail->Username = (string) $config['smtp_username'];
    $mail->Password = (string) $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->SMTPAutoTLS = true;
    $mail->CharSet = PHPMailer::CHARSET_UTF8;
    $mail->Timeout = 20;
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false,
        ],
    ];
    $mail->setFrom((string) $config['from_email'], (string) $config['from_name']);
    return $mail;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Metode tidak diizinkan.');
}

$config = load_private_config();
$requiredConfig = ['smtp_host', 'smtp_port', 'smtp_username', 'smtp_password', 'from_email', 'from_name', 'recipient'];
foreach ($requiredConfig as $key) {
    if (!isset($config[$key]) || trim((string) $config[$key]) === '') {
        error_log('BAI contact configuration is incomplete.');
        respond(500, false, 'Layanan formulir sedang belum tersedia. Silakan coba lagi nanti.');
    }
}

enforce_same_origin($config);

$contentType = strtolower(trim(explode(';', (string) ($_SERVER['CONTENT_TYPE'] ?? ''))[0]));
if ($contentType !== 'application/json') {
    respond(415, false, 'Format permintaan tidak didukung.');
}

$raw = file_get_contents('php://input');
if (!is_string($raw) || $raw === '' || strlen($raw) > 16384) {
    respond(422, false, 'Mohon periksa kembali data yang diisi.');
}

try {
    $payload = json_decode($raw, true, 16, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(422, false, 'Mohon periksa kembali data yang diisi.');
}

if (!is_array($payload)) {
    respond(422, false, 'Mohon periksa kembali data yang diisi.');
}

if (text_value($payload, 'website') !== '') {
    respond(200, true, 'Pesan berhasil dikirim.');
}

enforce_rate_limit();

$submission = [
    'name' => text_value($payload, 'name'),
    'company' => text_value($payload, 'company'),
    'email' => text_value($payload, 'email'),
    'phone' => text_value($payload, 'phone'),
    'service' => text_value($payload, 'service'),
    'message' => text_value($payload, 'message'),
];

$allowedServices = [
    'Penyusunan Dokumen AMDAL',
    'UKL-UPL & Dokumen Lingkungan',
    'Pendampingan dan Penyusunan Dokumen PROPER',
    'Persetujuan Teknis',
    'Persetujuan Lingkungan Hidup',
    'Pemanfaatan dan Pengolahan LB3',
    'Sertifikat Laik Operasi (SLO)',
    'Lainnya',
];

$valid = text_length($submission['name']) >= 2 && text_length($submission['name']) <= 120
    && text_length($submission['company']) >= 2 && text_length($submission['company']) <= 160
    && text_length($submission['email']) <= 254
    && filter_var($submission['email'], FILTER_VALIDATE_EMAIL) !== false
    && text_length($submission['phone']) >= 7 && text_length($submission['phone']) <= 32
    && preg_match('/^[0-9+().\-\s]+$/u', $submission['phone']) === 1
    && in_array($submission['service'], $allowedServices, true)
    && text_length($submission['message']) >= 10 && text_length($submission['message']) <= 4000;

foreach (['name', 'company', 'email', 'phone', 'service'] as $headerField) {
    if (contains_header_break($submission[$headerField])) $valid = false;
}

if (!$valid) {
    respond(422, false, 'Mohon periksa kembali data yang diisi.');
}

if (!load_phpmailer($config)) {
    error_log('PHPMailer autoload file is unavailable for the BAI contact endpoint.');
    respond(500, false, 'Layanan formulir sedang belum tersedia. Silakan coba lagi nanti.');
}

date_default_timezone_set('Asia/Jakarta');
$submittedAt = date('d M Y, H:i T');
$source = 'https://baikonsultan.com/';
$subjectCompany = preg_replace('/[\r\n]+/', ' ', $submission['company']);
$subjectService = preg_replace('/[\r\n]+/', ' ', $submission['service']);
$subject = sprintf('[Website BAI Konsultan] %s — %s', $subjectService, $subjectCompany);

$rows = [
    'Nama Lengkap' => $submission['name'],
    'Nama Perusahaan' => $submission['company'],
    'Email' => $submission['email'],
    'Telepon' => $submission['phone'],
    'Layanan' => $submission['service'],
    'Waktu' => $submittedAt,
    'Sumber' => $source,
];

$adminText = "Permintaan konsultasi baru\n\n";
$adminHtml = '<h1 style="font:600 20px Arial,sans-serif;margin:0 0 20px">Permintaan konsultasi baru</h1>';
foreach ($rows as $label => $value) {
    $adminText .= $label . ': ' . $value . "\n";
    $adminHtml .= '<p style="font:14px/1.5 Arial,sans-serif;margin:0 0 8px"><strong>' . escape_html($label) . ':</strong> ' . escape_html($value) . '</p>';
}
$adminText .= "\nPesan:\n" . $submission['message'];
$adminHtml .= '<p style="font:14px/1.5 Arial,sans-serif;margin:20px 0 6px"><strong>Pesan:</strong></p><p style="font:14px/1.6 Arial,sans-serif;margin:0;white-space:pre-wrap">' . nl2br(escape_html($submission['message'])) . '</p>';

try {
    $adminMail = create_mailer($config);
    $adminMail->addAddress((string) $config['recipient']);
    $adminMail->addReplyTo($submission['email'], $submission['name']);
    $adminMail->Subject = $subject;
    $adminMail->isHTML(true);
    $adminMail->Body = $adminHtml;
    $adminMail->AltBody = $adminText;
    $adminMail->send();
} catch (Throwable) {
    error_log('BAI contact notification could not be sent.');
    respond(500, false, 'Pesan belum dapat dikirim. Silakan coba lagi nanti.');
}

$confirmationText = "Halo {$submission['name']},\n\nTerima kasih telah menghubungi BAI Konsultan. Permintaan konsultasi untuk {$submission['service']} sudah kami terima.\n\nTim kami akan meninjau kebutuhan Anda dan menghubungi kembali melalui email atau nomor telepon yang dicantumkan.\n\nSalam,\nPT Banua Aksha Inovasi";
$confirmationHtml = '<p style="font:14px/1.6 Arial,sans-serif;margin:0 0 16px">Halo ' . escape_html($submission['name']) . ',</p><p style="font:14px/1.6 Arial,sans-serif;margin:0 0 16px">Terima kasih telah menghubungi BAI Konsultan. Permintaan konsultasi untuk <strong>' . escape_html($submission['service']) . '</strong> sudah kami terima.</p><p style="font:14px/1.6 Arial,sans-serif;margin:0 0 16px">Tim kami akan meninjau kebutuhan Anda dan menghubungi kembali melalui email atau nomor telepon yang dicantumkan.</p><p style="font:14px/1.6 Arial,sans-serif;margin:0">Salam,<br>PT Banua Aksha Inovasi</p>';

try {
    $confirmationMail = create_mailer($config);
    $confirmationMail->addAddress($submission['email'], $submission['name']);
    $confirmationMail->addReplyTo((string) $config['recipient'], 'BAI Konsultan');
    $confirmationMail->Subject = 'Kami telah menerima permintaan konsultasi Anda';
    $confirmationMail->isHTML(true);
    $confirmationMail->Body = $confirmationHtml;
    $confirmationMail->AltBody = $confirmationText;
    $confirmationMail->send();
} catch (Throwable) {
    error_log('BAI contact confirmation email could not be sent.');
}

respond(200, true, 'Pesan berhasil dikirim.');
