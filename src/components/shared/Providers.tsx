"use client"
import { CartProvider } from "@/src/lib/cart-context"
import { WishlistProvider } from "@/src/lib/wishlist-context"
import { I18nProvider } from "@/src/lib/i18n-context"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </I18nProvider>
  )
}
