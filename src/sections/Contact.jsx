import { ArrowUpRight, MessageCirclePlus } from 'lucide-react'
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
              <MessageCirclePlus aria-hidden="true" />
            </span>
            <span className="contact-closing-action-copy">
              <strong>Mulai konsultasi</strong>
              <small>Terhubung langsung melalui WhatsApp</small>
            </span>
            <ArrowUpRight className="contact-closing-action-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
