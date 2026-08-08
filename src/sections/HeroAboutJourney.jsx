import { useRef } from 'react'
import { useHeroAboutJourney } from '../hooks/useHeroAboutJourney'
import About from './About'
import Hero from './Hero'

export default function HeroAboutJourney() {
  const journeyRef = useRef(null)
  const stageRef = useRef(null)
  const mediaRef = useRef(null)
  const heroContentRef = useRef(null)
  const aboutBackgroundRef = useRef(null)
  const headlineRef = useRef(null)
  const featuredRef = useRef(null)
  const featuredContentRef = useRef(null)
  const satelliteRefs = useRef([])

  useHeroAboutJourney({
    journeyRef,
    stageRef,
    mediaRef,
    heroContentRef,
    aboutBackgroundRef,
    headlineRef,
    featuredRef,
    featuredContentRef,
    satelliteRefs,
  })

  return (
    <div ref={journeyRef} className="hero-about-journey">
      <span id="tentang" className="about-scroll-anchor" aria-hidden="true" />
      <div ref={stageRef} className="hero-about-stage">
        <Hero journey mediaRef={mediaRef} contentRef={heroContentRef} />
        <About
          journey
          backgroundRef={aboutBackgroundRef}
          headlineRef={headlineRef}
          featuredRef={featuredRef}
          featuredContentRef={featuredContentRef}
          satelliteRefs={satelliteRefs}
        />
      </div>
    </div>
  )
}
