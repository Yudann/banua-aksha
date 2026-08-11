import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, CircleCheck, LoaderCircle, Send, X } from 'lucide-react'
import { services } from '../data/services'
import { useInView } from '../hooks/useInView'

const initialForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  website: '',
}

export default function Contact() {
  const [sectionRef, visible] = useInView({ threshold: 0.14 })
  const servicePickerRef = useRef(null)
  const serviceButtonRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [isServicePickerOpen, setIsServicePickerOpen] = useState(false)
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const successCloseButtonRef = useRef(null)

  useEffect(() => {
    if (!isServicePickerOpen) return undefined

    const closeFromOutside = (event) => {
      if (!servicePickerRef.current?.contains(event.target)) setIsServicePickerOpen(false)
    }
    const closeFromKeyboard = (event) => {
      if (event.key === 'Escape') {
        setIsServicePickerOpen(false)
        serviceButtonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromKeyboard)
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromKeyboard)
    }
  }, [isServicePickerOpen])

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false)
    setStatus('idle')
    setMessage('')
  }

  useEffect(() => {
    if (!isSuccessModalOpen) return undefined

    document.documentElement.classList.add('contact-success-open')
    window.dispatchEvent(new CustomEvent('site-scroll-lock', { detail: { locked: true } }))
    successCloseButtonRef.current?.focus()

    const closeFromKeyboard = (event) => {
      if (event.key === 'Escape') closeSuccessModal()
    }
    document.addEventListener('keydown', closeFromKeyboard)

    return () => {
      document.documentElement.classList.remove('contact-success-open')
      window.dispatchEvent(new CustomEvent('site-scroll-lock', { detail: { locked: false } }))
      document.removeEventListener('keydown', closeFromKeyboard)
    }
  }, [isSuccessModalOpen])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.company.trim() || !form.email.trim() || !form.phone.trim() || !form.service || !form.message.trim()) {
      setStatus('error')
      setMessage('Mohon lengkapi seluruh data sebelum mengirim permintaan.')
      return
    }
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.message || 'Pesan belum dapat dikirim. Silakan coba lagi.')

      const name = form.name
      setForm(initialForm)
      setSubmittedName(name)
      setStatus('success')
      setMessage('')
      setIsSuccessModalOpen(true)
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Pesan belum dapat dikirim. Silakan coba lagi.')
    }
  }

  const selectService = (service, index) => {
    setForm((current) => ({ ...current, service: service.title }))
    setActiveServiceIndex(index)
    setIsServicePickerOpen(false)
    serviceButtonRef.current?.focus()
  }

  const handleServiceKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (isServicePickerOpen) selectService(services[activeServiceIndex], activeServiceIndex)
      else setIsServicePickerOpen(true)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const direction = event.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (activeServiceIndex + direction + services.length) % services.length
      setActiveServiceIndex(nextIndex)
      setIsServicePickerOpen(true)
    }
  }

  return (
    <>
      <section
      ref={sectionRef}
      id="kontak"
      aria-labelledby="contact-title"
      className="contact-closing"
      data-visible={visible}
    >
      <div className="contact-closing-shell">
        <p className="contact-closing-kicker">HUBUNGI KAMI</p>

        <h2 id="contact-title" className="contact-closing-title">
          <span><i>Mari mulai percakapan.</i></span>
        </h2>
        <p className="contact-closing-intro">Ceritakan kebutuhan perusahaan Anda, dan tim Banua akan membantu menentukan langkah pendampingan yang sesuai.</p>

        <form className="contact-form" data-state={status} onSubmit={handleSubmit}>
          <div className="contact-form-fields">
            <label className="contact-form-field">
              <span>Nama Lengkap</span>
              <input name="name" value={form.name} onChange={handleChange} autoComplete="name" required />
            </label>
            <label className="contact-form-field">
              <span>Nama Perusahaan</span>
              <input name="company" value={form.company} onChange={handleChange} autoComplete="organization" required />
            </label>
            <label className="contact-form-field">
              <span>Email</span>
              <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required />
            </label>
            <label className="contact-form-field">
              <span>Telepon</span>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" required />
            </label>
            <label className="contact-form-field contact-form-field-wide">
              <span>Layanan</span>
              <span ref={servicePickerRef} className="contact-service-picker" data-open={isServicePickerOpen}>
                <button
                  ref={serviceButtonRef}
                  type="button"
                  className="contact-service-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={isServicePickerOpen}
                  aria-controls="contact-service-options"
                  onClick={() => setIsServicePickerOpen((current) => !current)}
                  onKeyDown={handleServiceKeyDown}
                >
                  <span>{form.service || 'Pilih layanan yang dibutuhkan'}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
                <span
                  id="contact-service-options"
                  className="contact-service-options"
                  role="listbox"
                  aria-label="Pilih layanan"
                  data-lenis-prevent
                >
                  {services.map((service, index) => (
                    <button
                      key={service.title}
                      type="button"
                      role="option"
                      aria-selected={form.service === service.title}
                      data-active={activeServiceIndex === index}
                      tabIndex={isServicePickerOpen ? 0 : -1}
                      onMouseEnter={() => setActiveServiceIndex(index)}
                      onClick={() => selectService(service, index)}
                    >
                      <span>{service.title}</span>
                      {form.service === service.title && <Check aria-hidden="true" />}
                    </button>
                  ))}
                </span>
              </span>
            </label>
            <label className="contact-form-field contact-form-field-wide">
              <span>Pesan</span>
              <textarea name="message" value={form.message} onChange={handleChange} rows="4" required />
            </label>
            <label className="contact-form-trap" aria-hidden="true">
              <span>Website</span>
              <input name="website" value={form.website} onChange={handleChange} tabIndex="-1" autoComplete="off" />
            </label>
          </div>

          <div className="contact-form-submit-row">
            <button className="contact-form-submit" type="submit" disabled={status === 'submitting'}>
              <span>{status === 'submitting' ? 'Mengirim pesan' : 'Kirim permintaan'}</span>
              {status === 'submitting' ? <LoaderCircle aria-hidden="true" /> : <Send aria-hidden="true" />}
            </button>
            {message && <p className="contact-form-status" data-state={status} role={status === 'error' ? 'alert' : 'status'}>{message}</p>}
          </div>
        </form>
      </div>
      </section>

      <div className="contact-success-modal" data-open={isSuccessModalOpen} aria-hidden={!isSuccessModalOpen}>
        <button className="contact-success-backdrop" type="button" tabIndex={isSuccessModalOpen ? 0 : -1} aria-label="Tutup pesan konfirmasi" onClick={closeSuccessModal} />
        <section className="contact-success-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-success-title">
          <button ref={successCloseButtonRef} className="contact-success-close" type="button" tabIndex={isSuccessModalOpen ? 0 : -1} aria-label="Tutup pesan konfirmasi" onClick={closeSuccessModal}>
            <X aria-hidden="true" />
          </button>
          <CircleCheck className="contact-success-icon" aria-hidden="true" />
          <p>PERMINTAAN TERKIRIM</p>
          <h2 id="contact-success-title">Terima kasih, {submittedName}.</h2>
          <span>Kami sudah menerima permintaan konsultasi Anda. Silakan cek email secara berkala, termasuk folder spam, untuk konfirmasi dan tindak lanjut dari tim kami.</span>
          <button className="contact-success-confirm" type="button" tabIndex={isSuccessModalOpen ? 0 : -1} onClick={closeSuccessModal}>Kembali ke halaman</button>
        </section>
      </div>
    </>
  )
}
