import { clientMosaicImages, clients } from '../data/clients'
import { useInView } from '../hooks/useInView'

function ClientCard({ name, index }) {
  return (
    <article tabIndex={0} className="group/client relative flex min-h-[clamp(116px,8vw,132px)] basis-[clamp(290px,23vw,350px)] flex-col justify-between gap-3.5 rounded-xl border border-[#2a432d]/20 bg-[#fffefa]/85 px-[clamp(23px,1.9vw,30px)] py-[clamp(20px,1.55vw,25px)] shadow-[0_5px_18px_rgba(31,51,34,.018)] outline-none transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-[#2a5230]/35 hover:bg-[#fffffc]/95 hover:shadow-[0_14px_34px_rgba(31,51,34,.052)] focus-visible:-translate-y-1 focus-visible:border-[#2a5230]/35 focus-visible:bg-[#fffffc]/95 max-[1050px]:basis-[clamp(275px,29vw,320px)] max-[620px]:min-h-28 max-[620px]:basis-[min(75vw,300px)] max-[620px]:rounded-[11px] max-[620px]:px-[22px] max-[620px]:py-5">
      <span className="text-[9px] font-semibold tracking-[.13em] text-[#31583a]/70">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="m-0 max-w-[22ch] font-display text-[clamp(24px,1.7vw,29px)] font-medium leading-none tracking-[-.029em] text-[#1b231d] transition-all duration-500 ease-editorial group-hover/client:translate-x-1 group-hover/client:text-[#294e33] group-focus-visible/client:translate-x-1 group-focus-visible/client:text-[#294e33] max-[620px]:text-[clamp(23px,6.6vw,27px)]">{name}</h3>
    </article>
  )
}

function MarqueeRow({ items, offset, reverse = false }) {
  return (
    <div className="group/marquee w-full overflow-hidden [--marquee-gap:10px] max-[620px]:[--marquee-gap:8px]">
      <div className={`${reverse ? 'client-marquee-reverse' : 'client-marquee-forward'} flex w-max will-change-transform group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-[var(--marquee-gap)] pr-[var(--marquee-gap)]" aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map((name, index) => <ClientCard key={`${copy}-${name}`} name={name} index={offset + index} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

const mosaicClasses = [
  'col-start-1 row-start-1 max-[820px]:col-start-1 max-[820px]:row-start-1 max-[620px]:col-start-1',
  'col-start-2 row-start-1 max-[820px]:col-start-2 max-[820px]:row-start-1 max-[620px]:col-start-2',
  'col-start-3 row-start-1 max-[820px]:col-start-3 max-[820px]:row-start-1 max-[620px]:col-start-3',
  'col-start-4 row-start-1 max-[820px]:col-start-4 max-[820px]:row-start-1 max-[620px]:hidden',
  'col-start-5 row-start-1 max-[820px]:hidden max-[620px]:hidden',
  'col-start-1 row-start-2 mb-[clamp(42px,3.8vw,62px)] max-[820px]:col-start-1 max-[820px]:row-start-2 max-[820px]:mb-[54px] max-[620px]:col-start-1 max-[620px]:row-start-2 max-[620px]:mb-[66px]',
  'col-start-5 row-start-2 mb-[clamp(42px,3.8vw,62px)] max-[820px]:col-start-4 max-[820px]:row-start-2 max-[820px]:mb-[54px] max-[620px]:col-start-3 max-[620px]:row-start-2 max-[620px]:mb-[66px]',
]

export default function Clients() {
  const [sectionRef, visible] = useInView({ threshold: 0.08 })
  const first = clients.slice(0, 7)
  const second = clients.slice(7)

  return (
    <section ref={sectionRef} id="klien" aria-labelledby="clients-title" className="relative z-[2] isolate overflow-hidden bg-ivory pb-[clamp(92px,6.8vw,122px)] text-ink max-[620px]:pb-[84px]">
      <div className="relative h-[clamp(390px,29vw,455px)] overflow-hidden isolate max-[1050px]:h-[420px] max-[820px]:h-[430px] max-[620px]:h-[390px]">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 z-[2] bg-[#f6f3eb]/40 max-[620px]:bg-[#f6f3eb]/50" />
          <div className="absolute inset-x-0 bottom-0 z-[3] h-[28%] bg-[linear-gradient(180deg,rgba(246,243,235,0)_0%,rgba(246,243,235,.58)_56%,#f6f3eb_100%)]" />

          <div className="absolute inset-0 z-[1] grid grid-cols-[1.05fr_1fr_1.15fr_.9fr_1.15fr] grid-rows-[clamp(132px,10.2vw,160px)_minmax(0,1fr)] gap-[clamp(6px,.52vw,9px)] px-[clamp(5px,.45vw,9px)] pt-[clamp(4px,.38vw,7px)] max-[820px]:grid-cols-4 max-[820px]:grid-rows-[118px_minmax(0,1fr)] max-[620px]:grid-cols-3 max-[620px]:grid-rows-[102px_minmax(0,1fr)] max-[620px]:gap-[5px] max-[620px]:px-[5px] max-[620px]:pt-1">
            {clientMosaicImages.map((src, index) => (
              <figure key={src} className={`m-0 overflow-hidden rounded-[clamp(9px,.75vw,14px)] bg-[#e4e5dd] max-[620px]:rounded-[9px] ${mosaicClasses[index]}`}>
                <img src={src} alt="" loading="lazy" className="h-full w-full scale-[1.018] object-cover opacity-[.54] [filter:saturate(.52)_contrast(.92)_brightness(1.055)_blur(.65px)]" />
              </figure>
            ))}
          </div>
        </div>

        <header className="absolute left-1/2 top-[61%] z-[5] flex w-[min(760px,58vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center max-[1050px]:w-[min(690px,62vw)] max-[820px]:w-[min(590px,68vw)] max-[620px]:w-[min(500px,74vw)]">
          <p className={`mb-3.5 text-[10px] font-semibold tracking-[.25em] text-[#31583a] transition-all duration-[620ms] ease-editorial after:mx-auto after:mt-2.5 after:block after:h-px after:w-7 after:bg-[#31583a]/55 max-[620px]:mb-3 max-[620px]:text-[8.5px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2.5 opacity-0'}`}><span className="tracking-[.12em] max-[620px]:hidden">05 — </span>KERJA SAMA</p>
          <h2 id="clients-title" className={`m-0 w-full font-display text-[clamp(42px,3.55vw,57px)] font-[550] leading-[.94] tracking-[-.038em] text-[#172019] transition-all duration-700 ease-editorial max-[1050px]:text-[clamp(40px,5vw,53px)] max-[820px]:text-[clamp(38px,6.5vw,50px)] max-[620px]:text-[clamp(34px,9.4vw,43px)] max-[620px]:leading-[.97] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[17px] opacity-0'}`}>
            <span className="block whitespace-nowrap max-[1050px]:whitespace-normal">Perusahaan yang Telah</span>
            <span className="block whitespace-nowrap max-[1050px]:whitespace-normal">Bekerja Sama dengan Banua</span>
          </h2>
          <p className={`mx-auto mt-3.5 max-w-[58ch] text-[12.5px] leading-[1.55] text-[#1d261f]/65 transition-all duration-[620ms] ease-editorial max-[620px]:mt-[13px] max-[620px]:max-w-[32ch] max-[620px]:text-[11.5px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>Kepercayaan yang dibangun melalui kolaborasi dan pendampingan kebutuhan lingkungan.</p>
        </header>
      </div>

      <div className={`relative z-[6] flex w-full flex-col gap-2.5 overflow-hidden pt-[3px] pb-2 transition-all duration-700 ease-editorial before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-[5] before:w-[clamp(24px,4vw,68px)] before:bg-[linear-gradient(90deg,#f6f3eb_0%,rgba(246,243,235,.9)_30%,rgba(246,243,235,0)_100%)] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-[5] after:w-[clamp(24px,4vw,68px)] after:bg-[linear-gradient(270deg,#f6f3eb_0%,rgba(246,243,235,.9)_30%,rgba(246,243,235,0)_100%)] max-[620px]:gap-2 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'}`}>
        <MarqueeRow items={first} offset={0} />
        <MarqueeRow items={second} offset={7} reverse />
      </div>
    </section>
  )
}
