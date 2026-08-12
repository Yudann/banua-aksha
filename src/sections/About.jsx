import { useRef } from 'react'
import { Leaf } from 'lucide-react'
import { useAboutParallax } from '../hooks/useAboutParallax'

const cards = {
  vision: {
    key: 'vision',
    label: 'VISI',
    copy: 'Menjadi konsultan lingkungan terpercaya yang memberikan solusi inovatif untuk pembangunan berkelanjutan.',
    image: '/assets/about-vision.webp',
    alt: 'Tim konsultan lingkungan meninjau kondisi lapangan di area hutan',
    width: 1122,
    height: 1402,
    strength: 0.55,
    object: 'object-[50%_38%]',
    motionIndex: 0,
  },
  mission: {
    key: 'mission',
    label: 'MISI',
    copy: 'Memberikan layanan konsultasi lingkungan yang profesional, berkualitas, dan tepat waktu.',
    image: '/assets/about-mission.webp',
    alt: 'Pengambilan sampel air sebagai bagian dari pemantauan kualitas lingkungan',
    width: 1122,
    height: 1402,
    strength: 0.8,
    object: 'object-[50%_46%]',
    motionIndex: 1,
  },
  values: {
    key: 'values',
    label: 'NILAI KAMI',
    copy: 'Integritas, profesionalisme, inovasi, kolaborasi, dan kepedulian lingkungan.',
    image: '/assets/about-values.webp',
    alt: 'Tim konsultan berdiskusi dan meninjau dokumen serta data lingkungan',
    width: 1448,
    height: 1086,
    strength: 0.65,
    object: 'object-[50%_48%]',
    motionIndex: 2,
  },
  commitment: {
    key: 'commitment',
    label: 'KOMITMEN KAMI',
    copy: 'Mendampingi setiap langkah bisnis untuk tumbuh bersama lingkungan.',
    image: '/assets/about-commitment.webp',
    alt: 'Dua konsultan lingkungan meninjau kawasan industri dari area hijau',
    width: 1122,
    height: 1402,
    strength: 0.45,
    object: 'object-[50%_44%]',
    motionIndex: 3,
  },
}

const cardSequence = [cards.vision, cards.mission, cards.values, cards.commitment]
const strengths = cardSequence.map((card) => card.strength)

function StoryCard({ card, cardRefs, satelliteRefs }) {
  return (
    <article
      ref={(node) => {
        cardRefs.current[card.motionIndex] = node
        satelliteRefs.current[card.motionIndex] = node
      }}
      className={`about-story-card group relative isolate min-h-0 overflow-hidden rounded-[clamp(10px,.9vw,15px)] bg-[#173221] shadow-[0_14px_40px_rgba(25,40,26,.08)] ${card.key}`}
    >
      <div className="absolute -inset-[4%] -z-30 overflow-hidden">
        <img src={card.image} alt={card.alt} width={card.width} height={card.height} loading="lazy" decoding="async" className={`story-media-img h-full w-full object-cover ${card.object}`} />
      </div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,rgba(7,18,10,.84)_0%,rgba(7,18,10,.42)_36%,rgba(7,18,10,.04)_70%),linear-gradient(to_right,rgba(8,18,10,.1),transparent_62%)]" />
      <div className="absolute inset-x-[clamp(14px,1.35vw,22px)] bottom-[clamp(14px,1.3vw,21px)] text-white">
        <p className="mb-2 text-[clamp(10px,.78vw,12px)] font-semibold leading-[1.15] tracking-[.09em] text-[#8fc67f]">{card.label}</p>
        <p className="m-0 max-w-[36ch] text-[clamp(14px,1.1vw,16px)] leading-[1.5] text-white/95 [text-shadow:0_2px_16px_rgba(0,0,0,.18)] max-[760px]:text-[14px]">{card.copy}</p>
      </div>
    </article>
  )
}

export default function About({
  journey = false,
  backgroundRef,
  headlineRef,
  featuredRef,
  featuredContentRef,
  satelliteRefs,
}) {
  const cardRefs = useRef([])
  const localSatelliteRefs = useRef([])
  const motionRefs = satelliteRefs ?? localSatelliteRefs
  useAboutParallax(cardRefs, strengths)

  return (
    <section
      aria-labelledby="about-title"
      className={`${journey ? 'about-journey-panel' : ''} relative z-[2] min-h-svh overflow-hidden rounded-t-[28px] bg-about px-[clamp(20px,2.2vw,36px)] py-[clamp(64px,6vw,96px)] text-ink shadow-[0_-18px_50px_rgba(10,25,14,0.08)] max-[900px]:rounded-t-[22px] max-[760px]:px-[18px] max-[760px]:py-[72px]`}
    >
      <div ref={backgroundRef} className="about-journey-background pointer-events-none absolute inset-0 bg-about">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(40,62,43,.14)_.55px,transparent_.55px)] [background-size:6px_6px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,.32),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-16%,rgba(223,213,184,.2),transparent_36%)]" />
      </div>

      <header ref={headlineRef} className="about-journey-headline relative z-30 mx-auto w-full max-w-[1040px] text-center">
        <h2 id="about-title" className="mx-auto m-0 max-w-[31ch] font-display text-[clamp(38px,3.35vw,54px)] font-medium leading-[1.01] tracking-[-.032em] text-[#172019] [text-wrap:balance] max-[760px]:max-w-[16ch] max-[760px]:text-[clamp(36px,9.8vw,48px)]">
          Pertumbuhan dan keberlanjutan<br className="max-[700px]:hidden" /> tidak harus berjalan <span className="text-[#315d38]">berlawanan.</span>
        </h2>
        <p className="mx-auto mt-[clamp(12px,1.45vw,18px)] max-w-[68ch] text-[clamp(15px,1.05vw,17px)] leading-[1.55] text-[#1d261f]/80 max-[760px]:max-w-[42ch] max-[760px]:text-[14px] max-[760px]:leading-[1.6]">
          Kami membantu perusahaan menerjemahkan kebutuhan operasional menjadi langkah lingkungan yang jelas, legal, dan dapat dijalankan.
        </p>
      </header>

      <div className="about-collage relative z-30 mx-auto mt-[clamp(44px,5vw,76px)] w-full max-w-[1380px]">
        <div className="about-side about-side-left">
          <StoryCard card={cards.vision} cardRefs={cardRefs} satelliteRefs={motionRefs} />
          <StoryCard card={cards.mission} cardRefs={cardRefs} satelliteRefs={motionRefs} />
        </div>

        <article ref={featuredRef} className="about-featured-card relative isolate min-h-0 overflow-hidden rounded-[clamp(11px,1vw,16px)] bg-[#102719] shadow-[0_18px_46px_rgba(18,38,23,.13)]">
          <div className="about-featured-fallback absolute -inset-[4%] -z-20 overflow-hidden">
            <img src="/assets/hero-bg.webp" alt="Bentang alam hijau dengan sungai dan kawasan industri yang berdampingan" width="1672" height="941" decoding="async" className="story-media-img h-full w-full object-cover object-center" />
          </div>
          <div className="about-featured-fallback absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(6,16,9,.95)_0%,rgba(6,16,9,.68)_38%,rgba(6,16,9,.04)_76%)]" />
          <div ref={featuredContentRef} className="about-featured-content absolute inset-x-[clamp(18px,1.7vw,28px)] bottom-[clamp(22px,2.3vw,36px)] z-30 text-white">
            <span className="mb-3 inline-flex size-[28px] text-[#8fcf78]" aria-hidden="true">
              <Leaf className="h-full w-full" strokeWidth={1.8} />
            </span>
            <h3 className="m-0 font-display text-[clamp(30px,2.6vw,42px)] font-medium leading-[.98] tracking-[-.025em]">Tentang Kami</h3>
            <span className="my-3.5 block h-0.5 w-[58px] bg-[#7fb86e]" />
            <p className="m-0 max-w-[44ch] text-[clamp(14px,1.05vw,16px)] leading-[1.6] text-white/95 max-[760px]:text-[14px]">
              PT Banua Aksha Inovasi (BAI Konsultan) merupakan badan usaha jasa konsultasi lingkungan yang mendampingi proposal proyek, studi kelayakan, perizinan teknis, dan penyusunan dokumen lingkungan secara profesional dan terukur.
            </p>
          </div>
        </article>

        <div className="about-side about-side-right">
          <StoryCard card={cards.values} cardRefs={cardRefs} satelliteRefs={motionRefs} />
          <StoryCard card={cards.commitment} cardRefs={cardRefs} satelliteRefs={motionRefs} />
        </div>
      </div>

    </section>
  )
}
