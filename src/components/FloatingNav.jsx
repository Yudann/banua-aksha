import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, MessageCirclePlus, X } from 'lucide-react'

const navItems = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang Kami' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#proses', label: 'Proses Kerja' },
  { href: '#komitmen', label: 'Komitmen' },
  { href: '#klien', label: 'Klien' },
  { href: '#kontak', label: 'Hubungi Kami' },
]

function Logo({ showName = false, tabIndex = 0 }) {
  return (
    <a className="site-nav-logo" href="#beranda" tabIndex={tabIndex} aria-label="Banua Aksha — Beranda">
      <img src="/banua-logo.png" alt="" />
      {showName && <span>Banua Aksha</span>}
    </a>
  )
}

function MenuButton({ isOpen, onClick, tabIndex = 0 }) {
  return (
    <button
      className="site-nav-menu-button"
      type="button"
      aria-expanded={isOpen}
      aria-controls="site-navigation-panel"
      aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      <Menu className="site-nav-menu-icon" aria-hidden="true" />
      <X className="site-nav-close-icon" aria-hidden="true" />
    </button>
  )
}

export default function FloatingNav() {
  const rootRef = useRef(null)
  const [isUtilityVisible, setIsUtilityVisible] = useState(() => window.matchMedia('(max-width: 900px)').matches)
  const [isMobileContactVisible, setIsMobileContactVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#beranda')
  const [surfaceTone, setSurfaceTone] = useState('light')

  useEffect(() => {
    let frame = 0
    const mobileQuery = window.matchMedia('(max-width: 900px)')

    const updateNavigation = () => {
      frame = 0
      const isMobile = mobileQuery.matches
      const utilityStart = Math.max(520, window.innerHeight * 0.72)
      const nextUtilityVisible = isMobile || window.scrollY >= utilityStart
      const probe = window.scrollY + window.innerHeight * 0.42
      const navProbe = Math.min(72, window.innerHeight * 0.1)
      let currentHref = '#beranda'
      let nextSurfaceTone = 'light'

      navItems.forEach(({ href }) => {
        const section = document.querySelector(href)
        if (!section) return
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        if (sectionTop <= probe) currentHref = href
      })

      document.querySelectorAll('[data-nav-surface]').forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= navProbe && rect.bottom > navProbe) {
          nextSurfaceTone = section.dataset.navSurface || 'light'
        }
      })

      setIsUtilityVisible((current) => (current === nextUtilityVisible ? current : nextUtilityVisible))
      setIsMobileContactVisible(isMobile && window.scrollY > 100)
      setActiveHref((current) => (current === currentHref ? current : currentHref))
      setSurfaceTone((current) => (current === nextSurfaceTone ? current : nextSurfaceTone))
      if (!nextUtilityVisible) setIsOpen(false)
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateNavigation)
    }

    updateNavigation()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    mobileQuery.addEventListener('change', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      mobileQuery.removeEventListener('change', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('site-menu-locked', isOpen)
    window.dispatchEvent(new CustomEvent('site-menu-lock', { detail: { locked: isOpen } }))

    return () => {
      document.documentElement.classList.remove('site-menu-locked')
      window.dispatchEvent(new CustomEvent('site-menu-lock', { detail: { locked: false } }))
    }
  }, [isOpen])

  useEffect(() => {
    const closeFromOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setIsOpen(false)
    }
    const closeFromKeyboard = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromKeyboard)
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromKeyboard)
    }
  }, [])

  return (
    <nav
      ref={rootRef}
      className="site-navigation"
      data-utility-visible={isUtilityVisible}
      data-open={isOpen}
      data-surface={surfaceTone}
      aria-label="Navigasi utama"
    >
      <div className="site-nav-hero" aria-hidden={isUtilityVisible}>
        <Logo showName tabIndex={isUtilityVisible ? -1 : 0} />
        <div className="site-nav-hero-links">
          {navItems.slice(1, 6).map(({ href, label }) => <a key={href} href={href} tabIndex={isUtilityVisible ? -1 : 0}>{label}</a>)}
        </div>
        <a className="site-nav-consult" href="#kontak" tabIndex={isUtilityVisible ? -1 : 0}><span>Konsultasikan Proyek</span><ArrowUpRight aria-hidden="true" /></a>
      </div>

      <div className="site-nav-utility" aria-hidden={!isUtilityVisible}>
        <Logo tabIndex={isUtilityVisible ? 0 : -1} />
        <div className="site-nav-utility-actions">
          <a className="site-nav-consult site-nav-consult-utility" href="#kontak" tabIndex={isUtilityVisible && !isOpen ? 0 : -1}><span>Konsultasikan Proyek</span><ArrowUpRight aria-hidden="true" /></a>
          <MenuButton isOpen={isOpen} tabIndex={isUtilityVisible ? 0 : -1} onClick={() => setIsOpen((current) => !current)} />
        </div>
      </div>

      <button className="site-nav-backdrop" type="button" tabIndex={-1} aria-label="Tutup menu" onClick={() => setIsOpen(false)} />

      <button
        className="site-nav-panel-close"
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Tutup menu navigasi"
        onClick={() => setIsOpen(false)}
      >
        <X aria-hidden="true" />
      </button>

      <div id="site-navigation-panel" className="site-nav-panel" data-lenis-prevent aria-hidden={!isOpen}>
        <div className="site-nav-panel-links">
          <p>Jelajahi</p>
          {navItems.map(({ href, label }, index) => (
            <a
              key={href}
              href={href}
              data-active={activeHref === href}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{label}</strong>
              <i aria-hidden="true"><ArrowUpRight /></i>
            </a>
          ))}

          <div className="site-nav-panel-footer">
            <a href="#kontak" tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
              <span>Konsultasikan Proyek</span><ArrowUpRight aria-hidden="true" />
            </a>
            <small>Environmental consulting · Indonesia</small>
          </div>
        </div>

        <figure className="site-nav-panel-visual">
          <img src="/assets/about-vision.webp" alt="Tim Banua Aksha berdiskusi di area lapangan" loading="lazy" />
          <span aria-hidden="true" />
          <figcaption><small>Banua Aksha Inovasi</small><strong>Solusi lingkungan yang dapat dijalankan.</strong></figcaption>
        </figure>
      </div>

      <a
        className="site-nav-mobile-contact"
        href="#kontak"
        data-visible={isMobileContactVisible}
        tabIndex={isMobileContactVisible && !isOpen ? 0 : -1}
        aria-label="Menuju bagian kontak"
      >
        <MessageCirclePlus aria-hidden="true" />
      </a>
    </nav>
  )
}
