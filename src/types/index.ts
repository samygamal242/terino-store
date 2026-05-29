export interface ProductWithRelations {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  comparePrice: number | null
  status: string
  isFeatured: boolean
  isNewArrival: boolean
  categoryId: string
  category: { id: string; name: string; slug: string }
  images: { id: string; url: string; alt: string | null; order: number }[]
  variants: {
    id: string
    size: { id: string; name: string; value: string } | null
    color: { id: string; name: string; value: string } | null
    sku: string | null
    stock: number
    price: number | null
  }[]
  tags: string[]
  material: string | null
  careInstructions: string | null
  createdAt: Date
}

export type CategoryWithCount = {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  isFeatured: boolean
  order: number
  _count: { products: number }
}
