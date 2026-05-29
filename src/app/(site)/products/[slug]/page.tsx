import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/src/lib/prisma"
import { ProductGallery } from "@/src/components/product/ProductGallery"
import { ProductInfo } from "@/src/components/product/ProductInfo"
import { ProductCard } from "@/src/components/product/ProductCard"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: { take: 1 } },
  })

  if (!product) return { title: "Product Not Found | TERINO" }

  return {
    title: `${product.name} | TERINO`,
    description: product.description || `${product.name} — luxury fashion from TERINO.`,
    openGraph: {
      images: product.images[0]?.url ? [{ url: product.images[0].url }] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug, status: "ACTIVE" },
    include: {
      images: { orderBy: { order: "asc" } },
      category: true,
      variants: { include: { size: true, color: true } },
    },
  })

  if (!product) notFound()

  const serialized = {
    ...product,
    price: Number(product.price),
    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
    variants: product.variants.map((v) => ({
      ...v,
      price: v.price ? Number(v.price) : null,
    })),
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      status: "ACTIVE",
    },
    take: 4,
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      category: true,
    },
  })

  const relatedSerialized = relatedProducts.map((p) => ({
    ...p,
    price: Number(p.price),
    comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
  }))

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={serialized} />
        </div>

        {relatedSerialized.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-heading text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedSerialized.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
