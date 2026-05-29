"use client"
import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className = "" }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`text-center mb-16 ${className}`}
    >
      {subtitle && (
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{subtitle}</p>
      )}
      <h2 className="text-3xl md:text-5xl font-heading text-white">{title}</h2>
      <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
    </motion.div>
  )
}
