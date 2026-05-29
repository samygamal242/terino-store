"use client"
import { useCart } from "@/src/lib/cart-context"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"

interface Props {
  id: string
  name: string
  slug: string
  price: number
  image: string
  className?: string
}

export function AddToCartButton({ id, name, slug, price, image, className = "" }: Props) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleClick = () => {
    addItem({ id, name, slug, price, image })
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 bg-gold text-black px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300 ${className}`}
    >
      <ShoppingBag size={14} />
      {added ? "Added!" : "Add to Cart"}
    </button>
  )
}
