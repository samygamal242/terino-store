"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/src/lib/cart-context"
import { ArrowLeft, ShoppingBag, Check } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customer: form,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      clearCart()
      setDone(true)
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0 && !done) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={48} className="text-white/20 mb-6" />
        <p className="text-sm text-white/50 mb-8">Your cart is empty.</p>
        <Link href="/products" className="bg-gold text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium">
          Shop Now
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
          <Check size={32} className="text-gold" />
        </div>
        <h1 className="text-2xl font-heading text-white mb-2">Order Placed!</h1>
        <p className="text-sm text-white/50 mb-8">Thank you for your purchase. We&apos;ll confirm via email.</p>
        <Link href="/products" className="bg-gold text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link href="/cart" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white uppercase tracking-[0.15em] mb-8 transition-colors">
        <ArrowLeft size={14} />
        Back to Cart
      </Link>
      <h1 className="text-2xl font-heading text-white mb-8">Checkout</h1>

      <div className="space-y-3 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-white/70">{item.name} x{item.quantity}</span>
            <span className="text-white">{(item.price * item.quantity).toFixed(2)} EGP</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
          <span className="text-sm text-white/50">Total</span>
          <span className="text-lg text-gold font-heading">{total.toFixed(2)} EGP</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.15em] text-white/40 mb-2">Full Name</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.15em] text-white/40 mb-2">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.15em] text-white/40 mb-2">Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.15em] text-white/40 mb-2">Shipping Address</label>
          <textarea
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows={3}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gold text-black py-4 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all disabled:opacity-50"
        >
          {submitting ? "Processing..." : `Place Order — ${total.toFixed(2)} EGP`}
        </button>
      </form>
    </div>
  )
}
