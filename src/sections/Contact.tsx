import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline
      gsap.fromTo(
        '.contact-headline',
        { y: 50, opacity: 0 },
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
        '.contact-subheadline',
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

      // Diagonal divider
      gsap.fromTo(
        '.diagonal-divider',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      )

      // Contact info items
      const infoItems = gsap.utils.toArray<HTMLElement>('.info-item')
      infoItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { scale: 0, y: 20 },
          {
            scale: 1,
            y: 0,
            duration: 0.5,
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

      // Social icons
      const socials = gsap.utils.toArray<HTMLElement>('.social-icon')
      socials.forEach((icon, i) => {
        gsap.fromTo(
          icon,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              toggleActions: 'play none none none',
            },
            delay: 1.2 + i * 0.1,
          }
        )
      })

      // Form container
      gsap.fromTo(
        '.form-container',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          delay: 0.5,
        }
      )

      // Input fields
      const inputs = gsap.utils.toArray<HTMLElement>('.form-field')
      inputs.forEach((input, i) => {
        gsap.fromTo(
          input,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              toggleActions: 'play none none none',
            },
            delay: 0.8 + i * 0.12,
          }
        )
      })

      // Submit button
      gsap.fromTo(
        '.submit-btn',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            toggleActions: 'play none none none',
          },
          delay: 1.4,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowDialog(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: "M'hamid El Ghizlane, Morocco",
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+212 713-929350',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'abdoprjct@gmail.com',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Available 7 days a week',
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/ab.dulwahab4201', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://wa.me/212713929350', label: 'WhatsApp' },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#f5f0e1] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="contact-headline section-headline font-display text-4xl md:text-5xl lg:text-[60px] text-[#1a1a1a] leading-tight mb-4">
            Get in <span className="text-[#c9a227]">Touch</span>
          </h2>
          <p className="contact-subheadline font-body text-base md:text-lg text-[#1a1a1a]/70 max-w-xl mx-auto">
            Ready for your Sahara adventure? Contact us to plan your perfect
            desert experience.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 relative">
          {/* Diagonal Divider (visible on lg) */}
          <div className="diagonal-divider hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#c9a227]/30 to-transparent origin-top" />

          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            {/* Info Items */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="info-item flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#c9a227]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a227]/20 transition-colors">
                    <item.icon className="w-5 h-5 text-[#c9a227]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[#1a1a1a]/50 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="font-body text-sm md:text-base text-[#1a1a1a]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-[#1a1a1a]/10">
              <p className="font-body text-xs text-[#1a1a1a]/50 uppercase tracking-wider mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon w-10 h-10 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center text-[#1a1a1a] hover:bg-[#c9a227] hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

             {/* Real Google Map */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-inner border border-[#c9a227]/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13784.847134045435!2d-5.723!3d29.824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdab44f6f7b7f7f7%3A0x7d6f7f7f7f7f7f7!2sM'hamid%20El%20Ghizlane!5e0!3m2!1sen!2sma!4v1648000000000!5m2!1sen!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="form-container bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="form-field">
                <label className="block font-body text-xs text-[#1a1a1a]/50 uppercase tracking-wider mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="form-field">
                <label className="block font-body text-xs text-[#1a1a1a]/50 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div className="form-field">
                <label className="block font-body text-xs text-[#1a1a1a]/50 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="+1 234 567 890"
                />
              </div>

              {/* Message */}
              <div className="form-field">
                <label className="block font-body text-xs text-[#1a1a1a]/50 uppercase tracking-wider mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Tell us about your dream desert adventure..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="submit-btn btn-golden w-full bg-[#c9a227] text-[#1a1a1a] px-6 py-4 rounded-lg font-body text-sm font-medium tracking-wide flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#1a1a1a]">
              Message Sent!
            </DialogTitle>
            <DialogDescription className="font-body text-[#1a1a1a]/70">
              Thank you for reaching out. We'll get back to you within 24 hours
              to help plan your Sahara adventure.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowDialog(false)}
              className="btn-golden bg-[#c9a227] text-[#1a1a1a] px-6 py-2 rounded font-body text-sm font-medium"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Contact
