"use client"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { ReactNode } from "react"

export type Locale = "en" | "ar"

interface I18nContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  dir: "ltr" | "rtl"
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

const translations: Record<Locale, Record<string, string>> = {
  en: {
    "nav.shop": "Shop",
    "nav.about": "Our Story",
    "nav.contact": "Contact",
    "cart.title": "Cart",
    "cart.empty": "Your cart is empty",
    "cart.checkout": "Checkout",
    "cart.total": "Total",
    "wishlist.title": "Wishlist",
    "wishlist.empty": "Your wishlist is empty",
    "product.addToCart": "Add to Cart",
    "product.added": "Added!",
    "search.placeholder": "Search products...",
    "footer.rights": "All rights reserved.",
    "newsletter.title": "Join the Inner Circle",
    "newsletter.placeholder": "Enter your email",
    "newsletter.submit": "Subscribe",
    "hero.tagline": "Premium Fashion Store",
    "hero.subtitle": "Premium fashion for the discerning individual. Discover our exclusive collection.",
    "hero.explore": "Explore Collection",
    "hero.story": "Our Story",
  },
  ar: {
    "nav.shop": "المتجر",
    "nav.about": "قصتنا",
    "nav.contact": "اتصل بنا",
    "cart.title": "سلة التسوق",
    "cart.empty": "سلة التسوق فارغة",
    "cart.checkout": "إتمام الشراء",
    "cart.total": "المجموع",
    "wishlist.title": "قائمة الرغبات",
    "wishlist.empty": "قائمة الرغبات فارغة",
    "product.addToCart": "أضف إلى السلة",
    "product.added": "تمت الإضافة!",
    "search.placeholder": "ابحث عن منتجات...",
    "footer.rights": "جميع الحقوق محفوظة.",
    "newsletter.title": "انضم إلى النخبة",
    "newsletter.placeholder": "أدخل بريدك الإلكتروني",
    "newsletter.submit": "اشتراك",
    "hero.tagline": "متجر أزياء فاخر",
    "hero.subtitle": "أزياء راقية للأفراد المميزين. اكتشف مجموعتنا الحصرية.",
    "hero.explore": "استكشف المجموعة",
    "hero.story": "قصتنا",
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const stored = localStorage.getItem("terino_locale") as Locale | null
    if (stored === "ar" || stored === "en") setLocaleState(stored)
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem("terino_locale", l)
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = l
  }, [])

  const dir: "ltr" | "rtl" = locale === "ar" ? "rtl" : "ltr"

  const t = useCallback((key: string) => {
    return translations[locale]?.[key] || key
  }, [locale])

  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [locale, dir])

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
