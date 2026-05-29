"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  isFeatured: z.boolean().optional().default(false),
  order: z.number().optional().default(0),
})

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { products: true } } },
  })
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: { _count: { select: { products: true } } },
  })
}

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const validated = categorySchema.parse(data)
  const category = await prisma.category.create({ data: validated })
  revalidatePath("/categories")
  revalidatePath("/admin/categories")
  return category
}

export async function updateCategory(id: string, data: Partial<z.infer<typeof categorySchema>>) {
  const category = await prisma.category.update({ where: { id }, data })
  revalidatePath("/categories")
  revalidatePath("/admin/categories")
  return category
}

export async function deleteCategory(id: string) {
  await prisma.category.delete({ where: { id } })
  revalidatePath("/categories")
  revalidatePath("/admin/categories")
}
