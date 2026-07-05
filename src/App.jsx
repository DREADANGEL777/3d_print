import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Technologies from './components/Technologies.jsx'
import Process from './components/Process.jsx'
import Pricing from './components/Pricing.jsx'
import Portfolio from './components/Portfolio.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Process />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
