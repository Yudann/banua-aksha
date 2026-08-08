import Clients from './sections/Clients'
import Commitments from './sections/Commitments'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import HeroAboutJourney from './sections/HeroAboutJourney'
import Process from './sections/Process'
import Services from './sections/Services'
import Values from './sections/Values'
import VisionMission from './sections/VisionMission'
import Navbar from './components/Navbar'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()

  return (
    <>
      <Navbar />
      <main>
        <HeroAboutJourney />
        <Services />
        <Process />
        <Commitments />
        <Clients />
        <VisionMission />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
