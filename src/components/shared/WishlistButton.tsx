"use client"
import { useWishlist } from "@/src/lib/wishlist-context"
import { Heart } from "lucide-react"

interface Props {
  id: string
  name: string
  slug: string
  price: number
  image: string
  className?: string
}

export function WishlistButton({ id, name, slug, price, image, className = "" }: Props) {
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const liked = isInWishlist(id)

  return (
    <button
      onClick={() => liked ? removeItem(id) : addItem({ id, name, slug, price, image })}
      className={`transition-colors ${liked ? "text-red-400" : "text-white/40 hover:text-white"} ${className}`}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={18} fill={liked ? "currentColor" : "none"} />
    </button>
  )
}
