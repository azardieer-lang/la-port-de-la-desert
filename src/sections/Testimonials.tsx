import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'London, UK',
      avatar: '/avatar-1.jpg',
      title: 'An unforgettable experience!',
      text: 'The camel trek was magical. Our guide was knowledgeable and the camp was comfortable. Watching the sunset over the dunes is something I\'ll never forget. The Berber hospitality was beyond anything I expected.',
      rating: 5,
    },
    {
      name: 'James & Lisa T.',
      location: 'New York, USA',
      avatar: '/avatar-2.jpg',
      title: 'Authentic desert adventure',
      text: 'We wanted an authentic experience and that\'s exactly what we got. Sleeping under the stars, traditional meals cooked in the sand, and the warm hospitality of the Berber people made this trip unforgettable.',
      rating: 5,
    },
    {
      name: 'Michael R.',
      location: 'Sydney, Australia',
      avatar: '/avatar-3.jpg',
      title: 'Exceeded all expectations',
      text: 'The 4x4 expedition to Erg Chegaga was thrilling. The landscape is otherworldly and our driver knew all the best spots for photos. The luxury camp was a perfect blend of comfort and authenticity.',
      rating: 5,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline
      gsap.fromTo(
        '.testimonials-headline',
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

      // Carousel container
      gsap.fromTo(
        '.testimonials-carousel',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      )

      // Dots
      gsap.fromTo(
        '.testimonials-dots',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          delay: 0.8,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const normalizedDiff =
      diff > testimonials.length / 2
        ? diff - testimonials.length
        : diff < -testimonials.length / 2
        ? diff + testimonials.length
        : diff

    if (normalizedDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(50px) scale(1)',
        opacity: 1,
        zIndex: 3,
      }
    } else if (normalizedDiff === 1 || normalizedDiff === -(testimonials.length - 1)) {
      return {
        transform: 'translateX(120%) translateZ(-50px) scale(0.85) rotateY(-15deg)',
        opacity: 0.6,
        zIndex: 1,
      }
    } else if (normalizedDiff === -1 || normalizedDiff === testimonials.length - 1) {
      return {
        transform: 'translateX(-120%) translateZ(-50px) scale(0.85) rotateY(15deg)',
        opacity: 0.6,
        zIndex: 1,
      }
    }
    return {
      transform: 'translateX(0) translateZ(-100px) scale(0.7)',
      opacity: 0,
      zIndex: 0,
    }
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#f5f0e1] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="testimonials-headline section-headline font-display text-4xl md:text-5xl lg:text-[60px] text-[#1a1a1a] leading-tight">
            What Our <span className="text-[#c9a227]">Travelers</span> Say
          </h2>
        </div>

        {/* 3D Carousel */}
        <div className="testimonials-carousel relative max-w-3xl mx-auto perspective-container">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1a1a1a] hover:text-[#c9a227] hover:shadow-xl transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1a1a1a] hover:text-[#c9a227] hover:shadow-xl transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-3d absolute w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 transition-all duration-600"
                style={getCardStyle(index)}
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-[#c9a227]/20 mb-4" />

                {/* Rating */}
                <div className="star-rating mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="star w-5 h-5 fill-[#c9a227] text-[#c9a227]"
                    />
                  ))}
                </div>

                {/* Title */}
                <h4 className="font-display text-xl md:text-2xl text-[#1a1a1a] mb-3">
                  {testimonial.title}
                </h4>

                {/* Text */}
                <p className="font-body text-sm md:text-base text-[#1a1a1a]/70 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#c9a227]"
                  />
                  <div>
                    <p className="font-display text-lg text-[#1a1a1a]">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-sm text-[#1a1a1a]/60">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="testimonials-dots flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#c9a227] w-8'
                    : 'bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
