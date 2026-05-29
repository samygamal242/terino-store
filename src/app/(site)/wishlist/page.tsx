"use client"
import Link from "next/link"
import { useWishlist } from "@/src/lib/wishlist-context"
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react"
import { AddToCartButton } from "@/src/components/shared/AddToCartButton"
import { useI18n } from "@/src/lib/i18n-context"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { t } = useI18n()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <Heart size={48} className="text-white/20 mb-6" />
        <h1 className="text-2xl font-heading text-white mb-2">{t("wishlist.title")}</h1>
        <p className="text-sm text-white/50 mb-8">{t("wishlist.empty")}</p>
        <Link
          href="/products"
          className="bg-gold text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading text-white">{t("wishlist.title")} ({items.length})</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group">
            <Link href={`/products/${item.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-white/5">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </Link>
            <div className="mt-3 space-y-1">
              <h3 className="text-sm text-white/90 truncate">{item.name}</h3>
              <p className="text-sm text-gold">{item.price.toFixed(2)} EGP</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <AddToCartButton
                id={item.id}
                name={item.name}
                slug={item.slug}
                price={item.price}
                image={item.image}
                className="flex-1 text-[10px] px-3 py-2"
              />
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-white/30 hover:text-red-400 transition-colors"
                aria-label="Remove"
              >
                <ShoppingBag size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
