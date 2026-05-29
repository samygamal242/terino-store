"use client"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react"
import { BRAND, CATEGORIES } from "@/src/lib/constants"
import { useCart } from "@/src/lib/cart-context"
import { useI18n, type Locale } from "@/src/lib/i18n-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<{ id: string; name: string; slug: string; price: number; images: { url: string }[] }[]>([])
  const { count } = useCart()
  const { locale, setLocale, t } = useI18n()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!query || query.length < 2) { setResults([]); return }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`)
        if (res.ok) setResults(await res.json())
      } catch { /* ignore */ }
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading tracking-[0.3em] text-white hover:text-gold transition-colors">
          {BRAND.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="text-sm uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors duration-300"
            >
              {t(`category.${cat.slug}`)}
            </Link>
          ))}
          <Link
            href="/products"
            className="text-sm uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors duration-300"
          >
            {t("nav.all")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white/80 hover:text-gold transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <Link href="/cart" className="relative text-white/80 hover:text-gold transition-colors" aria-label="Cart">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-black text-[9px] font-bold flex items-center justify-center rounded-full">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="text-white/80 hover:text-gold transition-colors" aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          <button
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            className="text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-gold transition-colors"
          >
            {locale === "en" ? "AR" : "EN"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white/80 hover:text-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            ref={searchRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-black/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="max-w-2xl mx-auto px-6 py-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                autoFocus
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
              />
              {results.length > 0 && (
                <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
                  {results.map((r) => (
                    <Link
                      key={r.id}
                      href={`/products/${r.slug}`}
                      onClick={() => { setShowSearch(false); setQuery("") }}
                      className="flex items-center gap-3 p-2 hover:bg-white/5 transition-colors"
                    >
                      <div
                        className="w-10 h-10 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${r.images[0]?.url || ""})` }}
                      />
                      <div>
                        <p className="text-sm text-white">{r.name}</p>
                        <p className="text-xs text-gold">{Number(r.price).toFixed(2)} EGP</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 backdrop-blur-md overflow-hidden"
          >
            <nav className="px-6 py-8 flex flex-col gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors"
                >
                  {t(`category.${cat.slug}`)}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors"
              >
                {t("nav.allProducts")}
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors"
              >
                {t("nav.contact")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
