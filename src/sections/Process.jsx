import { useRef } from 'react'
import { processSteps } from '../data/processSteps'
import { useInView } from '../hooks/useInView'
import { useProcessScroll } from '../hooks/useProcessScroll'

export default function Process() {
  const [sectionRef, visible] = useInView({ threshold: 0.05, once: false })
  const introRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])

  useProcessScroll({ sectionRef, introRef, trackRef, cardRefs })

  return (
    <section ref={sectionRef} id="proses" aria-labelledby="process-title" className="relative z-[1] h-[300vh] bg-ivory text-ink max-[900px]:h-auto max-[900px]:px-[22px] max-[900px]:pt-[104px] max-[900px]:pb-[130px] max-[620px]:px-[17px] max-[620px]:pt-[90px] max-[620px]:pb-[112px]">
      <div className="sticky top-0 h-svh min-h-[660px] w-full overflow-hidden bg-ivory max-[900px]:relative max-[900px]:h-auto max-[900px]:min-h-0 max-[900px]:overflow-visible max-[900px]:bg-transparent">
        <div ref={introRef} className={`pointer-events-none absolute left-[clamp(28px,5vw,82px)] top-1/2 z-[4] w-[min(350px,25vw)] -translate-y-1/2 transition-opacity duration-[620ms] ease-editorial max-[1180px]:left-8 max-[1180px]:w-[300px] max-[900px]:relative max-[900px]:left-auto max-[900px]:top-auto max-[900px]:w-full max-[900px]:max-w-[560px] max-[900px]:transform-none ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="mb-5 text-[11px] font-semibold tracking-[.14em] text-[#31583a] max-[620px]:mb-[18px]">03 — PROSES KERJA</p>
          <h2 id="process-title" className="m-0 max-w-[9ch] font-display text-[clamp(44px,3.75vw,61px)] font-medium leading-[.98] tracking-[-.04em] text-[#1b231d] max-[1180px]:text-[clamp(42px,4vw,54px)] max-[900px]:max-w-[12ch] max-[900px]:text-[clamp(46px,8vw,62px)] max-[620px]:text-[clamp(42px,11vw,54px)]">Proses terarah dari awal hingga selesai.</h2>
          <p className="mt-[22px] max-w-[31ch] text-[13px] leading-[1.65] text-[#1d261f]/60 max-[900px]:max-w-[42ch] max-[620px]:mt-5">Setiap tahap disusun jelas agar proses lebih mudah diikuti.</p>
        </div>

        <div className="absolute inset-0 z-[2] overflow-visible max-[900px]:relative max-[900px]:inset-auto max-[900px]:mt-[62px] max-[620px]:mt-[50px]" aria-label="Lima tahapan proses kerja">
          <div ref={trackRef} className="absolute left-0 top-0 z-[2] h-full w-[2600px] will-change-transform max-[900px]:relative max-[900px]:flex max-[900px]:h-auto max-[900px]:w-full max-[900px]:flex-col max-[900px]:gap-[18px] max-[900px]:transform-none">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                ref={(node) => { cardRefs.current[index] = node }}
                data-position={step.position}
                className={`absolute flex h-[clamp(270px,20.5vw,300px)] w-[clamp(220px,15vw,250px)] flex-col justify-between rounded-[18px] border border-[#2b482f]/15 p-[clamp(24px,1.8vw,30px)] shadow-[0_12px_28px_rgba(31,51,34,.045)] transition-opacity duration-500 will-change-transform max-[1180px]:h-[clamp(255px,24vw,285px)] max-[1180px]:w-[clamp(205px,18vw,232px)] max-[900px]:relative max-[900px]:top-auto max-[900px]:left-auto max-[900px]:h-auto max-[900px]:min-h-[250px] max-[900px]:w-[min(430px,84%)] max-[900px]:transform-none max-[900px]:opacity-100 max-[620px]:min-h-[235px] max-[620px]:w-[88%] max-[620px]:rounded-2xl max-[620px]:p-6 ${step.position === 'upper' ? 'top-[18%]' : 'top-[49%]'} ${index % 2 === 0 ? 'bg-[#f2efe5] max-[900px]:self-start' : 'bg-[#eee9dc] max-[900px]:self-end'} ${visible ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="m-0 text-[11px] font-semibold tracking-[.08em] text-[#31583a] tabular-nums">{step.number}</p>
                <div>
                  <h3 className="mb-3 font-display text-[clamp(26px,1.85vw,32px)] font-medium leading-[.98] tracking-[-.03em] text-[#1b241d] max-[620px]:text-[29px]">{step.title}</h3>
                  <p className="m-0 text-xs leading-[1.58] text-[#1f2821]/65">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
