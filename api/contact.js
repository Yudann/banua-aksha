import { Resend } from 'resend'

const MAX_LENGTHS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 48,
  service: 160,
  message: 4000,
}

const getString = (value, limit) => typeof value === 'string' ? value.trim().slice(0, limit) : ''

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Metode tidak diizinkan.' })
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const website = getString(body.website, 200)
  if (website) return res.status(200).json({ ok: true })

  const submission = Object.fromEntries(
    Object.entries(MAX_LENGTHS).map(([key, limit]) => [key, getString(body[key], limit)]),
  )
  const missingField = Object.entries(submission).find(([, value]) => !value)
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)

  if (missingField || !isValidEmail) {
    return res.status(400).json({ message: 'Mohon lengkapi data dengan email yang valid.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error('Contact email environment variables are not configured.')
    return res.status(500).json({ message: 'Layanan formulir sedang belum tersedia. Silakan coba lagi nanti.' })
  }

  const resend = new Resend(apiKey)
  const safeName = submission.name.replace(/[\r\n]+/g, ' ')
  const adminText = [
    'Permintaan konsultasi baru',
    '',
    `Nama Lengkap: ${submission.name}`,
    `Nama Perusahaan: ${submission.company}`,
    `Email: ${submission.email}`,
    `Telepon: ${submission.phone}`,
    `Layanan: ${submission.service}`,
    '',
    'Pesan:',
    submission.message,
  ].join('\n')
  const customerText = [
    `Halo ${submission.name},`,
    '',
    'Terima kasih telah menghubungi PT Banua Aksha Inovasi.',
    `Permintaan konsultasi untuk ${submission.service} sudah kami terima.`,
    '',
    'Tim kami akan meninjau kebutuhan Anda dan menghubungi kembali melalui email atau nomor telepon yang telah dicantumkan.',
    'Silakan cek inbox dan folder spam secara berkala.',
    '',
    'Salam,',
    'PT Banua Aksha Inovasi',
  ].join('\n')

  const { error } = await resend.batch.send([
    {
      from,
      to,
      replyTo: submission.email,
      subject: `Permintaan konsultasi baru - ${safeName}`,
      text: adminText,
    },
    {
      from,
      to: submission.email,
      subject: 'Kami telah menerima permintaan konsultasi Anda',
      text: customerText,
    },
  ])

  if (error) {
    console.error('Resend contact email failed:', error)
    return res.status(502).json({ message: 'Pesan belum dapat dikirim. Silakan coba lagi.' })
  }

  return res.status(200).json({ ok: true })
}
