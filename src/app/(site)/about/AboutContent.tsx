"use client"
import { motion } from "framer-motion"
import { BRAND } from "@/src/lib/constants"
import { WhatsAppButton } from "@/src/components/shared/WhatsAppButton"

const values = [
  { title: "Craftsmanship", desc: "Every piece is selected for its superior quality and attention to detail." },
  { title: "Elegance", desc: "Timeless designs that transcend seasonal trends and fast fashion." },
  { title: "Exclusivity", desc: "Curated collections that set you apart from the ordinary." },
]

export function AboutContent() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">About {BRAND.name}</p>
            <h1 className="text-4xl md:text-6xl font-heading text-white mb-8">
              Luxury Redefined
            </h1>
            <div className="w-12 h-[1px] bg-gold mb-8" />
            <p className="text-white/60 leading-relaxed mb-6">
              {BRAND.name} was born from a vision to bridge the gap between timeless elegance and
              modern luxury. We curate premium fashion pieces that speak to the discerning
              individual who values quality, aesthetics, and exclusivity.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Based in {BRAND.address}, we source the finest products from around the world,
              ensuring every item in our collection meets the highest standards of design and
              craftsmanship.
            </p>
            <WhatsAppButton />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="aspect-[3/4] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
        </div>

        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading text-white text-center mb-16"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-8 text-center"
              >
                <h3 className="text-lg font-heading text-white mb-3">{val.title}</h3>
                <div className="w-8 h-[1px] bg-gold mx-auto mb-4" />
                <p className="text-sm text-white/50 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-16 border-t border-white/5"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Our Promise</p>
          <h2 className="text-2xl md:text-4xl font-heading text-white max-w-2xl mx-auto">
            We believe luxury is not a price point — it&apos;s a feeling, an experience, a statement.
          </h2>
        </motion.div>
      </div>
    </div>
  )
}
