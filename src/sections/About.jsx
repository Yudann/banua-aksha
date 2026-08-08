import { useRef } from 'react'
import { useAboutParallax } from '../hooks/useAboutParallax'
import { useInView } from '../hooks/useInView'

const cards = [
  {
    key: 'vision',
    label: 'VISI',
    copy: 'Menjadi konsultan lingkungan hidup terpercaya dengan pengawasan dan solusi inovatif demi keberlanjutan bumi.',
    image: '/assets/about-vision.png',
    alt: 'Tim konsultan lingkungan melakukan survei lapangan di area sungai dan hutan',
    strength: 0.55,
    layout: 'col-[1/4] row-[1/5] max-[1050px]:col-[1/3] max-[1050px]:row-[1/5]',
    initial: '-translate-x-[46px] -translate-y-6 scale-[.975]',
    object: 'object-[50%_38%]',
    delay: 170,
    contentDelay: 680,
  },
  {
    key: 'mission',
    label: 'MISI',
    copy: 'Memberikan layanan profesional berbasis kajian ilmiah, mendorong inovasi berkelanjutan, dan mendukung industri ramah lingkungan.',
    image: '/assets/about-mission.png',
    alt: 'Pengambilan sampel air sebagai bagian dari pemantauan kualitas lingkungan',
    strength: 0.8,
    layout: 'col-[1/4] row-[5/9] ml-[19%] max-[1050px]:col-[1/3] max-[1050px]:row-[5/9] max-[1050px]:ml-0',
    initial: '-translate-x-[46px] translate-y-[34px] scale-[.975]',
    object: 'object-[50%_46%]',
    delay: 330,
    contentDelay: 840,
  },
  {
    key: 'about',
    label: 'ABOUT',
    image: '/assets/hero-bg.png',
    alt: 'Bentang alam hijau dengan sungai dan kawasan industri yang berdampingan',
    strength: 0.35,
    layout: 'col-[4/8] row-[2/10] max-[1050px]:col-[3/7] max-[1050px]:row-[1/8]',
    initial: 'translate-y-12 scale-[.94]',
    object: 'object-center',
    delay: 40,
    contentDelay: 620,
    featured: true,
  },
  {
    key: 'values',
    label: 'NILAI KAMI',
    copy: 'Profesionalisme, inovasi, keberlanjutan, integritas, dan kualitas menjadi dasar setiap pekerjaan kami.',
    image: '/assets/about-values.png',
    alt: 'Tim konsultan berdiskusi dan meninjau dokumen serta data lingkungan',
    strength: 0.65,
    layout: 'col-[8/11] row-[2/5] mr-[9%] max-[1050px]:col-[7/9] max-[1050px]:row-[2/6] max-[1050px]:mr-0',
    initial: 'translate-x-[46px] -translate-y-[26px] scale-[.975]',
    object: 'object-[50%_48%]',
    delay: 250,
    contentDelay: 760,
  },
  {
    key: 'commitment',
    label: 'KOMITMEN KAMI',
    copy: 'Mendampingi kebutuhan klien dengan layanan tepat waktu, responsif, legal, dan ditangani tim ahli profesional.',
    image: '/assets/about-commitment.png',
    alt: 'Dua konsultan lingkungan meninjau kawasan industri dari area hijau',
    strength: 0.45,
    layout: 'col-[8/13] row-[5/10] ml-[4%] max-[1050px]:col-[3/9] max-[1050px]:row-[8/14] max-[1050px]:ml-0',
    initial: 'translate-x-12 translate-y-9 scale-[.975]',
    object: 'object-[50%_44%]',
    delay: 410,
    contentDelay: 920,
  },
]

const strengths = cards.map((card) => card.strength)

export default function About() {
  const [sectionRef, visible] = useInView({ threshold: 0.16 })
  const cardRefs = useRef([])
  useAboutParallax(cardRefs, strengths)

  return (
    <section
      ref={sectionRef}
      id="tentang"
      aria-labelledby="about-title"
      className="relative z-[2] -mt-[18px] min-h-svh overflow-hidden rounded-t-[28px] bg-about px-[clamp(20px,2.2vw,36px)] py-[clamp(72px,7vw,110px)] shadow-[0_-18px_50px_rgba(10,25,14,0.08)] max-[760px]:-mt-3.5 max-[760px]:rounded-t-[22px] max-[760px]:px-[18px] max-[760px]:pt-[72px] max-[760px]:pb-[70px]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(40,62,43,.14)_.55px,transparent_.55px)] [background-size:6px_6px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,.38),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(223,213,184,.18),transparent_38%)]" />
      <h2 className="sr-only" id="about-title">Tentang Banua Aksha Inovasi</h2>

      <div className={`relative z-[2] mx-auto mb-[clamp(28px,3.5vw,48px)] flex items-center justify-center gap-3 text-[10px] font-semibold tracking-[.16em] text-[#213524]/70 transition-all duration-700 ease-editorial max-[760px]:mb-6 max-[760px]:justify-start ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'}`} aria-hidden="true">
        <span>01</span><i className="h-px w-[42px] bg-[#315d38]/50" /><span>TENTANG BANUA</span>
      </div>

      <div className="relative z-[2] mx-auto grid h-[clamp(620px,64vw,790px)] w-full max-w-[1380px] grid-cols-12 grid-rows-10 gap-[clamp(10px,1vw,16px)] max-[1050px]:h-[980px] max-[1050px]:grid-cols-8 max-[1050px]:grid-rows-[repeat(13,minmax(0,1fr))] max-[760px]:flex max-[760px]:h-auto max-[760px]:flex-col max-[760px]:gap-3">
        {cards.map((card, index) => (
          <article
            key={card.key}
            ref={(node) => { cardRefs.current[index] = node }}
            className={`group relative isolate overflow-hidden rounded-[clamp(10px,.9vw,15px)] bg-[#173221] shadow-[0_14px_40px_rgba(25,40,26,.08)] transition-[transform,opacity,box-shadow] duration-[900ms] ease-editorial hover:z-[5] hover:-translate-y-[5px] hover:scale-[1.008] hover:shadow-[0_24px_52px_rgba(20,38,23,.16)] max-[760px]:m-0 max-[760px]:min-h-[290px] max-[760px]:w-full ${card.layout} ${card.featured ? 'max-[760px]:order-[-5] max-[760px]:min-h-[520px]' : card.key === 'vision' ? 'max-[760px]:order-[-4]' : card.key === 'mission' ? 'max-[760px]:order-[-3]' : card.key === 'values' ? 'max-[760px]:order-[-2]' : 'max-[760px]:order-[-1] max-[760px]:min-h-[390px]'} ${visible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : `${card.initial} opacity-0`}`}
            style={{ transitionDelay: `${card.delay}ms` }}
          >
            <div className="absolute -inset-[4%] -z-30 overflow-hidden">
              <img src={card.image} alt={card.alt} className={`story-media-img h-full w-full object-cover ${card.object}`} />
            </div>
            <div className={`absolute inset-0 -z-20 ${card.featured ? 'bg-[linear-gradient(to_top,rgba(6,16,9,.94)_0%,rgba(6,16,9,.63)_38%,rgba(6,16,9,.02)_74%),linear-gradient(to_right,rgba(8,18,10,.10),transparent_58%)]' : 'bg-[linear-gradient(to_top,rgba(7,18,10,.82)_0%,rgba(7,18,10,.40)_34%,rgba(7,18,10,.03)_68%),linear-gradient(to_right,rgba(8,18,10,.08),transparent_60%)]'}`} />

            {card.featured ? (
              <div className={`absolute inset-x-[clamp(14px,1.35vw,22px)] bottom-[clamp(20px,2.2vw,34px)] text-white transition-all duration-700 ease-editorial ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${card.contentDelay}ms` }}>
                <span className="mb-2.5 inline-flex size-[27px] text-[#8fcf78]" aria-hidden="true">
                  <svg viewBox="0 0 40 40" className="h-full w-full fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]">
                    <path d="M29.8 8.8C20.2 9.2 12.2 13.2 9.6 20.3c-2 5.4.3 9.7 3.8 11.1 4.6 1.8 10.1-.5 12.8-5.9 2.9-5.8 2.4-11.7 3.6-16.7Z" />
                    <path d="M11.4 29.1c4.1-6.2 8.8-10.2 14.5-12.9" />
                  </svg>
                </span>
                <h3 className="m-0 font-display text-[clamp(26px,2.25vw,38px)] font-medium leading-[.98] tracking-[-.025em]">Tentang Kami</h3>
                <span className={`my-3 block h-0.5 w-[58px] origin-left bg-[#7fb86e] transition-transform duration-900 ease-editorial ${visible ? 'scale-x-100' : 'scale-x-0'}`} style={{ transitionDelay: '930ms' }} />
                <p className="m-0 max-w-[42ch] text-[clamp(10px,.73vw,12px)] leading-[1.58] text-white/90 max-[760px]:text-xs">PT Banua Aksha Inovasi merupakan badan usaha jasa konsultan di bidang lingkungan hidup yang mendampingi kebutuhan project proposal, studi kelayakan, perizinan teknis, dan penyusunan dokumen secara profesional.</p>
              </div>
            ) : (
              <div className={`absolute inset-x-[clamp(14px,1.35vw,22px)] bottom-[clamp(14px,1.3vw,21px)] text-white transition-all duration-700 ease-editorial ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${card.contentDelay}ms` }}>
                <p className="mb-[7px] text-[clamp(7px,.57vw,9px)] font-semibold leading-none tracking-[.12em] text-[#8fc67f]">{card.label}</p>
                <p className="m-0 max-w-[34ch] text-[clamp(10px,.78vw,12px)] leading-normal text-white/95 [text-shadow:0_2px_16px_rgba(0,0,0,.18)] max-[760px]:max-w-[38ch] max-[760px]:text-xs">{card.copy}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className={`relative z-[2] mx-auto mt-[clamp(25px,3vw,42px)] flex w-full max-w-[1380px] justify-between border-t border-[#26472a]/20 pt-[15px] text-[8px] font-semibold tracking-[.17em] text-[#26472a]/50 transition-all duration-700 ease-editorial max-[760px]:gap-[18px] max-[760px]:text-[7px] max-[760px]:leading-normal max-[410px]:flex-col ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`} style={{ transitionDelay: '1000ms' }} aria-hidden="true">
        <span>BANUA AKSHA INOVASI</span>
        <span>SMART SOLUTIONS FOR THE ENVIRONMENT</span>
      </div>
    </section>
  )
}
