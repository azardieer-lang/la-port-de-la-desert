import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dune SVG draw
      gsap.fromTo(
        '.dune-path',
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Logo
      gsap.fromTo(
        '.footer-logo',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      )

      // Tagline
      gsap.fromTo(
        '.footer-tagline',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.5,
        }
      )

      // Column headers
      const headers = gsap.utils.toArray<HTMLElement>('.footer-column-header')
      headers.forEach((header, i) => {
        gsap.fromTo(
          header,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 0.4 + i * 0.1,
          }
        )
      })

      // Links cascade
      const links = gsap.utils.toArray<HTMLElement>('.footer-link')
      links.forEach((link, i) => {
        gsap.fromTo(
          link,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 60%',
              toggleActions: 'play none none none',
            },
            delay: 0.6 + i * 0.05,
          }
        )
      })

      // Divider line
      gsap.fromTo(
        '.footer-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          delay: 1,
        }
      )

      // Bottom text
      gsap.fromTo(
        '.footer-bottom',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 40%',
            toggleActions: 'play none none none',
          },
          delay: 1.2,
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Tours', href: '#tours' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  const tourLinks = [
    { name: 'Camel Trek', href: '#tours' },
    { name: 'Desert Camp', href: '#tours' },
    { name: '4x4 Expedition', href: '#tours' },
    { name: 'Custom Tours', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    if (href === '#') return
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer ref={footerRef} className="relative w-full bg-[#1a1a1a] text-[#f5f0e1]">
      {/* Dune Silhouette */}
      <div className="absolute -top-[60px] left-0 right-0 h-[60px] overflow-hidden">
        <svg
          viewBox="0 0 1440 60"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            className="dune-path"
            d="M0,60 L0,30 Q360,0 720,30 T1440,30 L1440,60 Z"
            fill="#1a1a1a"
            stroke="#c9a227"
            strokeWidth="1"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 pt-20 pb-8">
        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="footer-logo inline-flex items-center gap-3 mb-4"
            >
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <path
                  d="M20 5C15 5 10 10 10 18C10 26 15 32 20 35C25 32 30 26 30 18C30 10 25 5 20 5Z"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2"
                />
                <circle cx="20" cy="16" r="3" fill="#c9a227" />
                <path
                  d="M15 25C15 22 17 20 20 20C23 20 25 22 25 25"
                  fill="none"
                  stroke="#c9a227"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-display text-2xl text-[#f5f0e1]">
                Sahara Tours
              </span>
            </a>
            <p className="footer-tagline font-body text-sm text-[#f5f0e1]/60 leading-relaxed">
              Authentic desert adventures from M'hamid El Ghizlane - where ancient
              nomadic traditions meet unforgettable journeys.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-column-header font-display text-lg text-[#f5f0e1] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="footer-link font-body text-sm text-[#f5f0e1]/60 hover:text-[#c9a227] transition-colors inline-block link-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tours */}
          <div>
            <h4 className="footer-column-header font-display text-lg text-[#f5f0e1] mb-4">
              Our Tours
            </h4>
            <ul className="space-y-3">
              {tourLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="footer-link font-body text-sm text-[#f5f0e1]/60 hover:text-[#c9a227] transition-colors inline-block link-underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

           </div>
        

        {/* Divider */}
        <div className="footer-divider h-[1px] bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent mb-8 origin-center" />

        {/* Bottom Bar */}
        <div className="footer-bottom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#f5f0e1]/40">
            © {new Date().getFullYear()} Sahara Tours. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#f5f0e1]/40 flex items-center gap-1">
            Designed with{' '}
            <Heart className="w-3 h-3 text-[#c9a227] fill-[#c9a227] animate-pulse" />{' '}
            for the desert
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
