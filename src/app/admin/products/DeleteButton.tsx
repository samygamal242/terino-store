"use client"
import { Trash2 } from "lucide-react"
import { deleteProduct } from "@/src/actions/products"

export function DeleteButton({ productId }: { productId: string }) {
  return (
    <form action={deleteProduct.bind(null, productId)}>
      <button
        type="submit"
        className="p-2 text-white/30 hover:text-red-400 transition-colors"
        onClick={(e) => {
          if (!confirm("Delete this product?")) e.preventDefault()
        }}
      >
        <Trash2 size={16} />
      </button>
    </form>
  )
}
