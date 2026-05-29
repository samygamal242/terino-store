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
    "nav.all": "All",
    "nav.allProducts": "All Products",
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
    "footer.quickLinks": "Quick Links",
    "footer.categories": "Categories",
    "footer.connect": "Connect",
    "footer.luxury": "Luxury Redefined",
    "newsletter.title": "Join the TERINO Community",
    "newsletter.tagline": "Stay Connected",
    "newsletter.description": "Be the first to know about new collections, exclusive offers, and luxury insights.",
    "newsletter.placeholder": "Your email address",
    "newsletter.submit": "Subscribe",
    "newsletter.success": "Thank you for subscribing!",
    "newsletter.error": "Something went wrong. Please try again.",
    "hero.tagline": "Premium Fashion Store",
    "hero.subtitle": "Premium fashion for the discerning individual. Discover our exclusive collection.",
    "hero.explore": "Explore Collection",
    "hero.story": "Our Story",
    "category.shoes": "Shoes",
    "category.sneakers": "Sneakers",
    "category.bags": "Bags",
    "category.accessories": "Accessories",
    "collections.title": "Collections",
    "collections.subtitle": "Featured",
    "collections.explore": "Explore Collection",
    "newArrivals.title": "New Arrivals",
    "newArrivals.subtitle": "Latest",
    "newArrivals.viewAll": "View All Products",
    "brandStory.tagline": "Our Story",
    "brandStory.title": "The Art of Luxury",
    "brandStory.p1": "At TERINO, we believe fashion is more than clothing — it's an expression of identity. Each piece in our collection is meticulously curated to embody elegance, sophistication, and timeless style.",
    "brandStory.p2": "Inspired by the world's most prestigious fashion houses, we bring you a selection that transcends trends. From premium shoes and sneakers to designer bags and accessories, every item tells a story of craftsmanship and luxury.",
    "brandStory.readMore": "Read More",
    "instagram.followUs": "Follow Us",
  },
  ar: {
    "nav.shop": "المتجر",
    "nav.about": "قصتنا",
    "nav.contact": "اتصل بنا",
    "nav.all": "الكل",
    "nav.allProducts": "جميع المنتجات",
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
    "footer.quickLinks": "روابط سريعة",
    "footer.categories": "الأقسام",
    "footer.connect": "تواصل معنا",
    "footer.luxury": "إعادة تعريف الفخامة",
    "newsletter.title": "انضم إلى مجتمع تيرينو",
    "newsletter.tagline": "ابق على تواصل",
    "newsletter.description": "كن أول من يعلم بالمجموعات الجديدة، العروض الحصرية، وآخر أخبار الموضة الفاخرة.",
    "newsletter.placeholder": "عنوان بريدك الإلكتروني",
    "newsletter.submit": "اشتراك",
    "newsletter.success": "شكراً لاشتراكك!",
    "newsletter.error": "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    "hero.tagline": "متجر أزياء فاخر",
    "hero.subtitle": "أزياء راقية للأفراد المميزين. اكتشف مجموعتنا الحصرية.",
    "hero.explore": "استكشف المجموعة",
    "hero.story": "قصتنا",
    "category.shoes": "الأحذية",
    "category.sneakers": "أحذية رياضية",
    "category.bags": "الحقائب",
    "category.accessories": "الإكسسوارات",
    "collections.title": "المجموعات",
    "collections.subtitle": "المميزة",
    "collections.explore": "استكشف المجموعة",
    "newArrivals.title": "أحدث الوصلات",
    "newArrivals.subtitle": "الجديد",
    "newArrivals.viewAll": "عرض جميع المنتجات",
    "brandStory.tagline": "قصتنا",
    "brandStory.title": "فن الأناقة والفخامة",
    "brandStory.p1": "في تيرينو، نؤمن بأن الموضة أكثر من مجرد ملابس — إنها تعبير عن الهوية. تم تصميم وتنسيق كل قطعة في مجموعتنا بعناية فائقة لتجسد الأناقة والتميز والأسلوب الخالد.",
    "brandStory.p2": "مستوحاة من أرقى بيوت الأزياء العالمية، نقدم لك تشكيلة تتخطى صيحات الموضة العابرة. من الأحذية الفاخرة والأحذية الرياضية إلى الحقائب والإكسسوارات المصممة بعناية، كل قطعة تروي قصة من الحرفية والفخامة.",
    "brandStory.readMore": "اقرأ المزيد",
    "instagram.followUs": "تابعنا",
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar")

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
