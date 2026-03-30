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
      // Headline animation
      gsap.fromTo(
        '.gallery-headline',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Subheadline
      gsap.fromTo(
        '.gallery-subheadline',
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
          delay: 0.2,
        }
      )

      // Images stagger
      const images = gsap.utils.toArray<HTMLElement>('.gallery-image')
      images.forEach((image, i) => {
        gsap.fromTo(
          image,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 50%',
              toggleActions: 'play none none none',
            },
            delay: 0.4 + i * 0.12,
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
      span: 'row-span-2',
    },
    {
      src: '/gallery-2.jpg',
      alt: 'Desert campfire gathering',
      span: '',
    },
    {
      src: '/gallery-3.jpg',
      alt: 'Golden sand dunes panorama',
      span: 'col-span-2',
    },
    {
      src: '/gallery-4.jpg',
      alt: '4x4 desert expedition',
      span: 'row-span-2',
    },
    {
      src: '/gallery-5.jpg',
      alt: 'Sunset over the dunes',
      span: '',
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
      className="relative w-full py-20 md:py-32 bg-[#f5f0e1] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="gallery-headline section-headline font-display text-4xl md:text-5xl lg:text-[60px] text-[#1a1a1a] leading-tight mb-4">
            Captivating Moments in the{' '}
            <span className="text-[#c9a227]">Sahara</span>
          </h2>
          <p className="gallery-subheadline font-body text-base md:text-lg text-[#1a1a1a]/70">
            Glimpses of your upcoming adventure
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`gallery-image relative rounded-lg overflow-hidden cursor-pointer group ${image.span}`}
              onClick={() => openLightbox(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="text-center mt-8">
          <p className="font-body text-sm text-[#1a1a1a]/50">
            Click any image to view in full size
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#1a1a1a]/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#c9a227] transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Gallery image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

export default Gallery
