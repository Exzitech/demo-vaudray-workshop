import { useCallback, useState } from 'react'
import Apropos from './components/Apropos'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Preloader from './components/Preloader'
import Prestations from './components/Prestations'
import Temoignages from './components/Temoignages'

export default function App() {
  const [pret, setPret] = useState(false)
  const demarrer = useCallback(() => setPret(true), [])

  return (
    <>
      <Preloader onFini={demarrer} />
      <Header />

      <main>
        <Hero pret={pret} />
        <Apropos />
        <Prestations />
        <Portfolio />
        <Temoignages />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
