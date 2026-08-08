import About from './sections/About'
import Clients from './sections/Clients'
import Commitments from './sections/Commitments'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Mission from './sections/Mission'
import Process from './sections/Process'
import Services from './sections/Services'
import Values from './sections/Values'
import Vision from './sections/Vision'
import { useLenis } from './hooks/useLenis'

export default function App() {
  useLenis()

  return (
    <>
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Commitments />
        <Clients />
        <Vision />
        <Mission />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
