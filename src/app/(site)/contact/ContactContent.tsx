"use client"
import { motion } from "framer-motion"
import { BRAND } from "@/src/lib/constants"
import { MessageCircle, Camera, MapPin, Mail, Phone } from "lucide-react"
import { WhatsAppButton } from "@/src/components/shared/WhatsAppButton"
import { submitContact } from "@/src/actions/contact"

export function ContactContent() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-4">Contact Us</h1>
          <p className="text-white/40 max-w-md">
            We&apos;d love to hear from you. Reach out for inquiries, collaborations, or just to say hello.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-white/80">
              Reach Out Directly
            </h2>
            <div className="space-y-6">
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <MessageCircle className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">WhatsApp</p>
                  <p className="text-sm text-white group-hover:text-gold transition-colors">
                    +{BRAND.whatsapp}
                  </p>
                </div>
              </a>

              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Camera className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">Instagram</p>
                  <p className="text-sm text-white group-hover:text-gold transition-colors">
                    {BRAND.instagramHandle}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center">
                  <MapPin className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">Location</p>
                  <p className="text-sm text-white/70">{BRAND.address}</p>
                </div>
              </div>

              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">Email</p>
                  <p className="text-sm text-white group-hover:text-gold transition-colors">
                    {BRAND.email}
                  </p>
                </div>
              </a>

              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">Phone</p>
                  <p className="text-sm text-white group-hover:text-gold transition-colors">
                    {BRAND.phone}
                  </p>
                </div>
              </a>
            </div>

            <WhatsAppButton className="w-full justify-center" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-sm uppercase tracking-[0.2em] text-white/80 mb-6">
              Send a Message
            </h2>
            <form action={submitContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-gold text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
