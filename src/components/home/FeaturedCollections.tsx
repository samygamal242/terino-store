"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { SectionTitle } from "@/src/components/shared/SectionTitle"
import { CATEGORIES } from "@/src/lib/constants"
import { useI18n } from "@/src/lib/i18n-context"

const categoryImages: Record<string, string> = {
  shoes: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
  sneakers: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
  bags: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop",
  accessories: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
}

export function FeaturedCollections() {
  const { t } = useI18n()

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title={t("collections.title")} subtitle={t("collections.subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/categories/${cat.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${categoryImages[cat.slug]})` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-heading text-white mb-2">{t(`category.${cat.slug}`)}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {t("collections.explore")}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
