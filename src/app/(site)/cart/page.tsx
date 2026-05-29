"use client"
import Link from "next/link"
import { useCart } from "@/src/lib/cart-context"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react"
import { useI18n } from "@/src/lib/i18n-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { t } = useI18n()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={48} className="text-white/20 mb-6" />
        <h1 className="text-2xl font-heading text-white mb-2">{t("cart.title")}</h1>
        <p className="text-sm text-white/50 mb-8">{t("cart.empty")}</p>
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
        <h1 className="text-2xl font-heading text-white">{t("cart.title")} ({items.length})</h1>
        <button
          onClick={clearCart}
          className="text-xs text-white/30 hover:text-white/60 uppercase tracking-[0.15em] transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border border-white/10">
            <Link href={`/products/${item.slug}`} className="shrink-0">
              <div
                className="w-20 h-20 bg-cover bg-center bg-white/5"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="text-sm text-white hover:text-gold transition-colors truncate block">
                {item.name}
              </Link>
              <p className="text-xs text-gold mt-1">{item.price.toFixed(2)} EGP</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 text-white/40 hover:text-white transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm text-white">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 text-white/40 hover:text-white transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            <p className="text-sm text-white w-20 text-right">
              {(item.price * item.quantity).toFixed(2)} EGP
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 text-white/20 hover:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-white/50">{t("cart.total")}</span>
          <span className="text-xl text-gold font-heading">{total.toFixed(2)} EGP</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
          <Link
            href="/checkout"
            className="flex-1 flex items-center justify-center bg-gold text-black px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-all"
          >
            {t("cart.checkout")}
          </Link>
        </div>
      </div>
    </div>
  )
}
