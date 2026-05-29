"use client"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, ShoppingBag } from "lucide-react"
import { BRAND, CATEGORIES } from "@/src/lib/constants"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50)
    }, { passive: true })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/95 backdrop-blur-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading tracking-[0.3em] text-white hover-gold">
          {BRAND.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="text-sm uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors duration-300"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/products"
            className="text-sm uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors duration-300"
          >
            All
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/products" className="text-white/80 hover:text-gold transition-colors">
            <Search size={20} />
          </Link>
          <Link href="/contact" className="text-white/80 hover:text-gold transition-colors">
            <ShoppingBag size={20} />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white/80 hover:text-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors"
              >
                All Products
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-[0.15em] text-white/80 hover:text-gold transition-colors"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
