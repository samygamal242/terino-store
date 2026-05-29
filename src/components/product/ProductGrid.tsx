import { ProductCard } from "./ProductCard"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice: number | null
  images: { url: string; alt: string | null }[]
  category: { name: string; slug: string }
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="col-span-full text-center py-20">
        <p className="text-white/30 text-sm uppercase tracking-[0.15em]">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
