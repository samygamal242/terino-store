"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { BRAND } from "@/src/lib/constants"
import { useI18n } from "@/src/lib/i18n-context"

interface HeroBanner {
  title: string | null
  subtitle: string | null
  imageUrl: string
  linkUrl: string | null
}

export function Hero({ banners }: { banners?: HeroBanner[] }) {
  const { t } = useI18n()
  const banner = banners?.[0]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${banner?.imageUrl || "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"}')`,
          filter: "brightness(0.4)",
        }}
      />
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs uppercase tracking-[0.3em] text-gold mb-6"
        >
          {banner?.subtitle || BRAND.tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-white mb-6 tracking-wide"
        >
          {BRAND.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm md:text-base text-white/60 max-w-md mb-12 tracking-wide"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href={banner?.linkUrl || "/products"}
            className="bg-gold text-black px-10 py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300"
          >
            {t("hero.explore")}
          </Link>
          <Link
            href="/about"
            className="border border-white/30 text-white px-10 py-4 text-sm uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300"
          >
            {t("hero.story")}
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-16 bg-gold/50 mx-auto" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mt-3">Scroll</p>
      </motion.div>
    </section>
  )
}
