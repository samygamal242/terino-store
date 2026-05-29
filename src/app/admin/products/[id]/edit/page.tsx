import { notFound } from "next/navigation"
import { prisma } from "@/src/lib/prisma"
import { ProductForm } from "../../ProductForm"

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
        category: true,
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  if (!product) notFound()

  const serialized = {
    ...product,
    price: Number(product.price),
    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
  }

  return (
    <div>
      <h1 className="text-2xl font-heading text-white mb-8">Edit Product</h1>
      <ProductForm product={serialized} categories={categories} />
    </div>
  )
}
