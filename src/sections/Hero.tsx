import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle configuration
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const particleCount = window.innerWidth < 768 ? 30 : 60

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 0.5 - 0.2,
        opacity: Math.random() * 0.3 + 0.1,
      })
    }

    let animationId: number
    let frameCount = 0

    const animate = () => {
      frameCount++
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle, i) => {
          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Wrap around
          if (particle.y < -10) {
            particle.y = canvas.height + 10
            particle.x = Math.random() * canvas.width
          }
          if (particle.x < -10) particle.x = canvas.width + 10
          if (particle.x > canvas.width + 10) particle.x = -10

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(201, 162, 39, ${particle.opacity})`
          ctx.fill()

          // Draw connections (only check every 5th particle for performance)
          if (i % 5 === 0) {
            particles.slice(i + 1, i + 4).forEach((other) => {
              const dx = particle.x - other.x
              const dy = particle.y - other.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 100) {
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(other.x, other.y)
                ctx.strokeStyle = `rgba(201, 162, 39, ${0.1 * (1 - distance / 100)})`
                ctx.stroke()
              }
            })
          }
        })
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Background Ken Burns effect
      tl.fromTo(
        '.hero-bg',
        { scale: 1.1, x: -20 },
        { scale: 1, x: 0, duration: 8, ease: 'power1.out' },
        0
      )

      // Headline word animation
      const words = gsap.utils.toArray<HTMLElement>('.hero-word')
      words.forEach((word, i) => {
        tl.fromTo(
          word,
          { y: 60, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
          },
          0.5 + i * 0.1
        )
      })

      // Subheadline
      tl.fromTo(
        '.hero-subheadline',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        1.2
      )

      // CTA Button
      tl.fromTo(
        '.hero-cta',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        1.6
      )

      // Scroll indicator
      tl.fromTo(
        '.scroll-indicator',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
        2.2
      )

      // Particles fade in
      tl.fromTo(
        canvasRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'none' },
        1
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToTours = () => {
    const element = document.querySelector('#tours')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Sahara Desert"
          className="hero-bg w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center items-center px-5 md:px-8 lg:px-12"
      >
        <div className="max-w-[700px] text-center">
          {/* Headline */}
          <h1 className="hero-headline font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-[#f5f0e1] leading-tight mb-6">
            <span className="hero-word inline-block">Experience</span>{' '}
            <span className="hero-word inline-block">the</span>{' '}
            <span className="hero-word inline-block text-[#c9a227]">Magic</span>{' '}
            <span className="hero-word inline-block">of</span>{' '}
            <span className="hero-word inline-block">the</span>{' '}
            <span className="hero-word inline-block text-[#c9a227]">Sahara</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-subheadline font-body text-base md:text-lg lg:text-xl text-[#f5f0e1]/90 leading-relaxed mb-8 max-w-[600px] mx-auto">
            Authentic desert adventures from M'hamid El Ghizlane - where ancient
            nomadic traditions meet unforgettable journeys under starlit skies.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToTours}
            className="hero-cta btn-golden bg-[#c9a227] text-[#1a1a1a] px-8 py-4 rounded font-body text-sm md:text-base font-medium tracking-wide inline-flex items-center gap-2"
          >
            Explore Our Tours
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToAbout}
          className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f5f0e1]/70 hover:text-[#f5f0e1] transition-colors"
        >
          <span className="font-body text-xs tracking-widest uppercase">
            Discover
          </span>
          <ChevronDown className="w-5 h-5 bounce-subtle" />
        </button>
      </div>

      {/* Bottom Dune Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,60 Q360,0 720,60 T1440,60 L1440,120 Z"
            fill="#f5f0e1"
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
