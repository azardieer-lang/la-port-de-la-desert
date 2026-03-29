import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Tours from './sections/Tours'
import Gallery from './sections/Gallery'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize scroll-triggered animations
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after all content loads
      ScrollTrigger.refresh()
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className="min-h-screen bg-[#f5f0e1]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Tours />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
