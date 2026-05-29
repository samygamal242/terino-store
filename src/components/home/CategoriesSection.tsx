"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { CATEGORIES } from "@/src/lib/constants"
import { ArrowRight } from "lucide-react"

const categoryImages: Record<string, string> = {
  shoes: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
  sneakers: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
  bags: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop",
  accessories: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
}

interface CategoriesSectionProps {
  productCounts?: Record<string, number>
}

export function CategoriesSection({ productCounts = {} }: CategoriesSectionProps) {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/categories/${cat.slug}`}
                className="group relative block aspect-square overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${categoryImages[cat.slug]})` }}
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-xl font-heading text-white mb-1">{cat.name}</h3>
                  {productCounts[cat.slug] !== undefined && (
                    <p className="text-xs text-white/40 mb-4">{productCounts[cat.slug]} items</p>
                  )}
                  <span className="text-xs uppercase tracking-[0.2em] text-gold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    Shop Now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
