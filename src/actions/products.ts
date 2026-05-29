"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  price: z.string().or(z.number()),
  comparePrice: z.string().or(z.number()).optional(),
  categoryId: z.string().min(1),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  material: z.string().optional(),
  careInstructions: z.string().optional(),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string().optional(),
  })).default([]),
})

export async function getProducts(params?: {
  category?: string
  status?: string
  featured?: boolean
  search?: string
  sort?: string
  limit?: number
}) {
  const where: Record<string, unknown> = {}

  if (params?.category) {
    where.category = { slug: params.category }
  }
  if (params?.status) {
    where.status = params.status
  } else {
    where.status = "ACTIVE"
  }
  if (params?.featured) {
    where.isFeatured = true
  }
  if (params?.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { description: { contains: params.search, mode: "insensitive" } },
    ]
  }

  let orderBy: Record<string, string> = { createdAt: "desc" }
  if (params?.sort === "price-asc") orderBy = { price: "asc" }
  else if (params?.sort === "price-desc") orderBy = { price: "desc" }
  else if (params?.sort === "name-asc") orderBy = { name: "asc" }
  else if (params?.sort === "name-desc") orderBy = { name: "desc" }

  const products = await prisma.product.findMany({
    where,
    orderBy,
    take: params?.limit,
    include: {
      images: { orderBy: { order: "asc" }, take: 1 },
      category: true,
    },
  })

  return products
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      category: true,
      variants: {
        include: { size: true, color: true },
      },
    },
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
      category: true,
      variants: {
        include: { size: true, color: true },
      },
    },
  })
}

export async function createProduct(data: z.infer<typeof productSchema>) {
  const validated = productSchema.parse(data)

  const product = await prisma.product.create({
    data: {
      name: validated.name,
      slug: validated.slug,
      description: validated.description,
      price: Number(validated.price),
      comparePrice: validated.comparePrice ? Number(validated.comparePrice) : null,
      categoryId: validated.categoryId,
      status: validated.status,
      isFeatured: validated.isFeatured,
      isNewArrival: validated.isNewArrival,
      tags: validated.tags,
      material: validated.material,
      careInstructions: validated.careInstructions,
      images: {
        create: validated.images.map((img, i) => ({
          url: img.url,
          alt: img.alt,
          order: i,
        })),
      },
    },
    include: {
      images: true,
      category: true,
    },
  })

  revalidatePath("/products")
  revalidatePath("/admin/products")
  return product
}

export async function updateProduct(id: string, data: Partial<z.infer<typeof productSchema>>) {
  const existingImages = await prisma.productImage.findMany({
    where: { productId: id },
    select: { id: true },
  })

  await prisma.productImage.deleteMany({ where: { productId: id } })

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price ? Number(data.price) : undefined,
      comparePrice: data.comparePrice ? Number(data.comparePrice) : undefined,
      categoryId: data.categoryId,
      status: data.status,
      isFeatured: data.isFeatured,
      isNewArrival: data.isNewArrival,
      tags: data.tags,
      material: data.material,
      careInstructions: data.careInstructions,
      images: data.images ? {
        create: data.images.map((img, i) => ({
          url: img.url,
          alt: img.alt,
          order: i,
        })),
      } : undefined,
    },
    include: { images: true, category: true },
  })

  revalidatePath("/products")
  revalidatePath(`/products/${product.slug}`)
  revalidatePath("/admin/products")
  return product
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })
  revalidatePath("/products")
  revalidatePath("/admin/products")
}

export async function toggleFeatured(id: string) {
  const product = await prisma.product.findUnique({ where: { id }, select: { isFeatured: true } })
  if (!product) throw new Error("Product not found")

  await prisma.product.update({
    where: { id },
    data: { isFeatured: !product.isFeatured },
  })

  revalidatePath("/admin/products")
  revalidatePath("/")
}
