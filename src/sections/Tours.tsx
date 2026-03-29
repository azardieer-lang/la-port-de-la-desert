import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Tours = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline letter animation
      const letters = gsap.utils.toArray<HTMLElement>('.tour-letter')
      letters.forEach((letter, i) => {
        gsap.fromTo(
          letter,
          { y: 50, rotateX: -40, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.03,
          }
        )
      })

      // Subheadline
      gsap.fromTo(
        '.tours-subheadline',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      )

      // Cards 3D flip
      const cards = gsap.utils.toArray<HTMLElement>('.tour-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotateY: i % 2 === 0 ? -90 : 90, y: 60, opacity: 0 },
          {
            rotateY: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
            },
            delay: 0.6 + i * 0.15,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const tours = [
    {
      image: '/tour-camel.jpg',
      title: 'Camel Trek Adventure',
      duration: '2-3 Days',
      description:
        'Journey like the ancient nomads on camelback through golden dunes, sleeping under a blanket of stars. Experience the true rhythm of desert life.',
      price: 'From €150',
      rotation: '-2deg',
    },
    {
      image: '/tour-camp.jpg',
      title: 'Luxury Desert Camp',
      duration: '1-2 Nights',
      description:
        'Experience the Sahara in comfort with our premium camp featuring en-suite tents, gourmet dining, and traditional Berber entertainment.',
      price: 'From €250',
      rotation: '2deg',
    },
    {
      image: '/tour-4x4.jpg',
      title: '4x4 Desert Expedition',
      duration: 'Full Day',
      description:
        'Explore the vast Erg Chegaga dunes and hidden oases on a thrilling off-road adventure. Perfect for adrenaline seekers.',
      price: 'From €120',
      rotation: '-2deg',
    },
  ]

  return (
    <section
      id="tours"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#f5f0e1] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-headline font-display text-4xl md:text-5xl lg:text-[60px] text-[#1a1a1a] leading-tight mb-4">
            {'Unforgettable Desert Tours'.split('').map((letter, i) => (
              <span
                key={i}
                className={`tour-letter inline-block ${
                  letter === ' ' ? 'w-3' : ''
                }`}
              >
                {letter}
              </span>
            ))}
          </h2>
          <p className="tours-subheadline font-body text-base md:text-lg text-[#1a1a1a]/70">
            Choose your perfect Sahara adventure
          </p>
        </div>

        {/* Cards Grid */}
        <div className="perspective-container grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {tours.map((tour, index) => (
            <div
              key={index}
              className="tour-card card-lift relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              style={{
                transform: `rotate(${tour.rotation})`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110 group-hover:-translate-y-2"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#c9a227] text-[#1a1a1a] px-3 py-1.5 rounded-full text-xs font-body font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {tour.duration}
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 bg-white">
                <h3 className="font-display text-2xl text-[#1a1a1a] mb-2 group-hover:text-[#c9a227] transition-colors">
                  {tour.title}
                </h3>
                <p className="font-body text-sm text-[#1a1a1a]/70 leading-relaxed mb-4">
                  {tour.description}
                </p>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-[#c9a227] font-medium">
                    {tour.price}
                  </span>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .querySelector('#contact')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="inline-flex items-center gap-1.5 font-body text-sm text-[#1a1a1a] hover:text-[#c9a227] transition-colors group/link"
                  >
                    <span className="link-underline">View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-[#1a1a1a]/60 mb-4">
            Looking for a custom experience?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-golden inline-flex items-center gap-2 bg-[#c9a227] text-[#1a1a1a] px-6 py-3 rounded font-body text-sm font-medium"
          >
            Create Your Custom Tour
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Tours
