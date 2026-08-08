import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [sectionRef, visible] = useInView({ threshold: 0.14 })

  return (
    <section
      ref={sectionRef}
      id="kontak"
      aria-labelledby="contact-title"
      className="contact-closing"
      data-visible={visible}
    >
      <div className="contact-closing-shell">
        <p className="contact-closing-kicker">08 — HUBUNGI KAMI</p>

        <h2 id="contact-title" className="contact-closing-title">
          <span><i>Mari bicarakan kebutuhan lingkungan</i></span>
          <span><i>perusahaan Anda.</i></span>
        </h2>

        <div className="contact-closing-bottom">
          <div className="contact-closing-note">
            <p>KONSULTASI AWAL</p>
            <span>Ceritakan kebutuhan proyek Anda. Tim Banua siap membantu menentukan langkah pendampingan yang sesuai.</span>
          </div>

          <a
            href="https://wa.me/628119799188"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-closing-action"
            aria-label="Mulai konsultasi melalui WhatsApp"
          >
            <span className="contact-closing-action-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 11.5a7.5 7.5 0 0 1-8 7.48 8.8 8.8 0 0 1-3.45-.9L4 19.5l1.42-4.12A7.5 7.5 0 1 1 20 11.5Z" />
                <path d="M9 11.5h6M12 8.5v6" />
              </svg>
            </span>
            <span className="contact-closing-action-copy">
              <strong>Mulai konsultasi</strong>
              <small>Terhubung langsung melalui WhatsApp</small>
            </span>
            <span className="contact-closing-action-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
