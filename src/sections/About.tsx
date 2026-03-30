import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, Compass, Leaf } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', y: 50 },
        {
          clipPath: 'inset(0% 0 0 0)',
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Golden line draw
      gsap.fromTo(
        '.golden-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Headline word animation
      const words = gsap.utils.toArray<HTMLElement>('.about-word')
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: 0.6 + i * 0.08,
          }
        )
      })

      // Body text lines
      gsap.fromTo(
        '.about-body',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          delay: 1,
        }
      )

      // Feature items
      const features = gsap.utils.toArray<HTMLElement>('.feature-item')
      features.forEach((feature, i) => {
        gsap.fromTo(
          feature,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              toggleActions: 'play none none none',
            },
            delay: 1.4 + i * 0.12,
          }
        )

        // Icon spin
        const icon = feature.querySelector('.feature-icon')
        if (icon) {
          gsap.fromTo(
            icon,
            { rotation: -180 },
            {
              rotation: 0,
              duration: 0.5,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 40%',
                toggleActions: 'play none none none',
              },
              delay: 1.4 + i * 0.12,
            }
          )
        }
      })

      // CTA button
      gsap.fromTo(
        '.about-cta',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            toggleActions: 'play none none none',
          },
          delay: 1.8,
        }
      )

      // Parallax on image
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: Users,
      title: 'Authentic Sahara Hospitality',
      description: 'Experience the genuine warmth of the Sahara. We welcome you not as a tourist, but as a guest in our home, sharing traditional mint tea and stories that have been passed down through generations',
    },
    {
      icon: Compass,
      title: 'Expert Local Guides',
      description: 'Abdulwahab and his team are sons of the desert. Their knowledge of the terrain, the weather, and the stars ensures a safe, insightful, and deeply personal exploration of the wilderness.',
    },
    {
      icon: Leaf,
      title: 'Sustainable Tourism Practices',
      description: 'We are committed to preserving the fragile beauty of our environment. Our tours honor nomadic traditions and support the local community, ensuring the Sahara remains a pristine sanctuary for generations to come.',
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#f5f0e1] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl"
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
              <img
                src="/about-image.jpg"
                alt="Berber guides with camel"
                className="w-full h-full object-cover transition-transform duration-600 hover:scale-105"
              />
            </div>

            {/* Golden accent line */}
            <div className="golden-line absolute -right-4 top-1/2 w-8 h-[3px] bg-[#c9a227] origin-left" />

            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-[#c9a227]/30 rounded-lg -z-10" />
          </div>

          {/* Content Column */}
          <div className="lg:pl-8">
            {/* Headline */}
            <h2 className="section-headline font-display text-4xl md:text-5xl lg:text-[60px] text-[#1a1a1a] leading-tight mb-6">
              <span className="about-word inline-block">Discover</span>{' '}
              <span className="about-word inline-block">the</span>{' '}
              <span className="about-word inline-block text-[#c9a227]">Gateway</span>{' '}
              <span className="about-word inline-block">to</span>{' '}
              <span className="about-word inline-block">the</span>{' '}
              <span className="about-word inline-block text-[#c9a227]">Sahara</span>
            </h2>

            {/* Body Text */}
            <div className="about-body space-y-4 mb-8">
              <p className="font-body text-base md:text-lg text-[#1a1a1a]/80 leading-relaxed">
                 M’hamid El Ghizlane is more than just the last village before the endless sands;
                 it is a living gateway to a world of silence, beauty, and ancient wisdom. Born and raised in these dunes, 
                 Abdulwahab carries the legacy of the nomads who once navigated the great trans-Saharan caravan routes. 
                 With a deep-rooted connection to the land, 
                 he invites you to step away from the modern world and immerse yourself in the authentic spirit of the Sahara.
              </p>
              <p className="font-body text-base md:text-lg text-[#1a1a1a]/80 leading-relaxed">
                 Our journeys are crafted for those who seek more than just a tour.
                 Whether you are trekking across the golden dunes of Erg Chegaga on camelback or sharing stories around a crackling campfire,
                 Abdulwahab ensures every moment is an invitation to connect with the desert’s timeless rhythm.
                 From the warm hospitality of the desert people to the hidden secrets of the oases, your adventure is guided by a local expert who knows every  place of the sahara.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item flex items-start gap-4 group cursor-pointer"
                >
                  <div className="feature-icon w-10 h-10 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a227]/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-[#c9a227]" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg md:text-xl text-[#1a1a1a] group-hover:text-[#c9a227] transition-colors">
                      {feature.title}
                    </h4>
                    <p className="font-body text-sm text-[#1a1a1a]/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="about-cta inline-flex items-center gap-2 font-body text-[#c9a227] hover:text-[#b08d1f] transition-colors group"
            >
              <span className="link-underline">Learn Our Story</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
