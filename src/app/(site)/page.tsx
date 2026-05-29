import { Suspense } from "react"
import { prisma } from "@/src/lib/prisma"
import { Hero } from "@/src/components/home/Hero"
import { FeaturedCollections } from "@/src/components/home/FeaturedCollections"
import { NewArrivals } from "@/src/components/home/NewArrivals"
import { CategoriesSection } from "@/src/components/home/CategoriesSection"
import { BrandStory } from "@/src/components/home/BrandStory"
import { InstagramSection } from "@/src/components/home/InstagramSection"
import { NewsletterSection } from "@/src/components/home/NewsletterSection"
import { ProductGridSkeleton } from "@/src/components/shared/LoadingSkeleton"

async function HeroSection() {
  const banners = await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    take: 1,
  })
  return <Hero banners={banners.map(b => ({ title: b.title, subtitle: b.subtitle, imageUrl: b.imageUrl, linkUrl: b.linkUrl }))} />
}

async function NewArrivalsSection() {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE", isNewArrival: true },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      category: true,
    },
  })

  const serialized = products.map((p) => ({
    ...p,
    price: Number(p.price),
    comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
  }))

  return <NewArrivals products={serialized} />
}

async function CategoriesWithCount() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  })

  const counts: Record<string, number> = {}
  categories.forEach((c) => {
    counts[c.slug] = c._count.products
  })

  return <CategoriesSection productCounts={counts} />
}

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<Hero />}>
        <HeroSection />
      </Suspense>
      <FeaturedCollections />
      <Suspense fallback={<ProductGridSkeleton />}>
        <NewArrivalsSection />
      </Suspense>
      <Suspense fallback={<div className="h-96 bg-black" />}>
        <CategoriesWithCount />
      </Suspense>
      <BrandStory />
      <InstagramSection />
      <NewsletterSection />
    </>
  )
}
