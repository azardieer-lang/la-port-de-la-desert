import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ZoomIn } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation - enhanced
      gsap.fromTo(
        '.gallery-headline',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Subheadline - enhanced
      gsap.fromTo(
        '.gallery-subheadline',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
          delay: 0.15,
        }
      )

      // Images stagger with enhanced easing
      const images = gsap.utils.toArray<HTMLElement>('.gallery-image')
      images.forEach((image, i) => {
        gsap.fromTo(
          image,
          { scale: 0.7, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'elastic.out(1.2, 0.75)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none none',
            },
            delay: 0.3 + i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const galleryImages = [
    {
      src: '/gallery-1.jpg',
      alt: 'Camel trekking in the Sahara',
      span: 'col-span-2 row-span-2',
    },
    {
      src: '/gallery-2.jpg',
      alt: 'Desert campfire gathering',
      span: 'row-span-2',
    },
    {
      src: '/gallery-3.jpg',
      alt: 'Golden sand dunes panorama',
      span: 'col-span-2',
    },
    {
      src: '/gallery-4.jpg',
      alt: '4x4 desert expedition',
      span: 'col-span-2 row-span-2',
    },
    {
      src: '/gallery-5.jpg',
      alt: 'Sunset over the dunes',
      span: 'row-span-2',
    },
    {
      src: '/gallery-6.jpg',
      alt: 'Starry night in the desert',
      span: 'col-span-2',
    },
  ]

  const openLightbox = (src: string) => {
    setLightboxImage(src)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-gradient-to-b from-[#f5f0e1] via-[#faf7f0] to-[#f0ebe2] overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c9a227]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
        {/* Header - Enhanced */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="gallery-headline section-headline font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] leading-tight mb-6 tracking-tight">
            Captivating Moments in the{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#c9a227] via-[#d4b540] to-[#c9a227] bg-clip-text text-transparent">
                Sahara
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a227] via-[#d4b540] to-[#c9a227] blur-sm opacity-60" />
            </span>
          </h2>
          <p className="gallery-subheadline font-body text-lg md:text-xl text-[#1a1a1a]/60 max-w-2xl mx-auto leading-relaxed">
            Glimpses of your upcoming adventure through the golden sands and timeless beauty
          </p>
        </div>

        {/* Bento Box Grid */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[260px]"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-image relative rounded-2xl overflow-hidden cursor-pointer group backdrop-blur-sm ${image.span}`}
              onClick={() => openLightbox(image.src)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
              />

              {/* Glassmorphism Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#1a1a1a]/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/50 transition-all duration-500 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100" />
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View
                  </span>
                </div>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-lg group-hover:shadow-2xl" />
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-12 md:mt-16">
          <p className="font-body text-sm md:text-base text-[#1a1a1a]/50 tracking-wide">
            ✨ Click any image to view in full size ✨
          </p>
        </div>
      </div>

      {/* Lightbox - Enhanced */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#c9a227] hover:scale-110 transition-all duration-300 p-2 hover:bg-white/10 rounded-full"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}

export default Gallery
