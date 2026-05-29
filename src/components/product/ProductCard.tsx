import Link from "next/link"
import { AddToCartButton } from "@/src/components/shared/AddToCartButton"
import { WishlistButton } from "@/src/components/shared/WishlistButton"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    comparePrice: number | null
    images: { url: string; alt: string | null }[]
    category: { name: string; slug: string }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0]
  const hasDiscount = !!product.comparePrice && product.comparePrice > product.price

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-white/5">
        {image ? (
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${image.url})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
            No image
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-gold text-black text-[10px] uppercase tracking-[0.15em] px-2 py-1 font-medium z-10">
            Sale
          </span>
        )}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            image={image?.url || ""}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <AddToCartButton
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            image={image?.url || ""}
            className="w-full"
          />
        </div>
      </Link>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] uppercase tracking-[0.15em] text-white/40">{product.category.name}</p>
        <h3 className="text-sm text-white/90 group-hover:text-gold transition-colors truncate">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gold">{product.price.toFixed(2)} EGP</span>
          {hasDiscount && product.comparePrice && (
            <span className="text-xs text-white/30 line-through">
              {product.comparePrice.toFixed(2)} EGP
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
