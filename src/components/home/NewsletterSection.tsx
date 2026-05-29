"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { useI18n } from "@/src/lib/i18n-context"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const { t } = useI18n()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">
            {t("newsletter.tagline")}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4">
            {t("newsletter.title")}
          </h2>
          <p className="text-white/50 text-sm mb-8 max-w-sm mx-auto">
            {t("newsletter.description")}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              required
              className="flex-1 bg-white/5 border border-white/10 px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              className="bg-gold text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300"
            >
              {t("newsletter.submit")}
            </button>
          </form>
          {status === "success" && (
            <p className="text-green-400 text-sm mt-3">{t("newsletter.success")}</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm mt-3">{t("newsletter.error")}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
