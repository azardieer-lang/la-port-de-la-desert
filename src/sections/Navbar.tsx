import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tours', href: '#tours' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('#home')
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 40 40"
                className="w-full h-full transition-transform duration-400 group-hover:scale-110"
                style={{ transformStyle: 'preserve-3d' }}
              >
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
            </div>
            <span
              className={`font-display text-xl md:text-2xl font-medium transition-colors duration-300 ${
                isScrolled ? 'text-[#f5f0e1]' : 'text-[#f5f0e1]'
              }`}
            >
              Sahara Tours
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className={`relative font-body text-sm tracking-wide transition-colors duration-300 link-underline ${
                  isScrolled
                    ? 'text-[#f5f0e1]/80 hover:text-[#f5f0e1]'
                    : 'text-[#f5f0e1]/80 hover:text-[#f5f0e1]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contact')
              }}
              className="btn-golden bg-[#c9a227] text-[#1a1a1a] px-6 py-3 rounded font-body text-sm font-medium tracking-wide"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#f5f0e1]" />
            ) : (
              <Menu className="w-6 h-6 text-[#f5f0e1]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.href)
                }}
                className="font-body text-[#f5f0e1]/80 hover:text-[#f5f0e1] transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#contact')
              }}
              className="btn-golden bg-[#c9a227] text-[#1a1a1a] px-6 py-3 rounded font-body text-sm font-medium text-center mt-2"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
