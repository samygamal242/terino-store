"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { BRAND } from "@/src/lib/constants"

export function BrandStory() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="aspect-[4/5] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop')",
            }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Our Story</p>
            <h2 className="text-3xl md:text-5xl font-heading text-white mb-8">
              The Art of Luxury
            </h2>
            <div className="w-12 h-[1px] bg-gold mb-8" />
            <p className="text-white/60 leading-relaxed mb-6">
              At {BRAND.name}, we believe fashion is more than clothing — it's an expression of
              identity. Each piece in our collection is meticulously curated to embody elegance,
              sophistication, and timeless style.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Inspired by the world's most prestigious fashion houses, we bring you a selection that
              transcends trends. From premium shoes and sneakers to designer bags and accessories,
              every item tells a story of craftsmanship and luxury.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold hover:text-white transition-colors"
            >
              Read More
              <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
