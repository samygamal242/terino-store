"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { SectionTitle } from "@/src/components/shared/SectionTitle"
import { ProductCard } from "@/src/components/product/ProductCard"
import { useI18n } from "@/src/lib/i18n-context"

interface NewArrivalsProps {
  products: Array<{
    id: string
    name: string
    slug: string
    price: number
    comparePrice: number | null
    images: { url: string; alt: string | null }[]
    category: { name: string; slug: string }
  }>
}

export function NewArrivals({ products }: NewArrivalsProps) {
  const { t } = useI18n()

  if (!products.length) return null

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title={t("newArrivals.title")} subtitle={t("newArrivals.subtitle")} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-block border border-white/20 text-white px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
          >
            {t("newArrivals.viewAll")}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
