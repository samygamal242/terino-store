import { WhatsAppButton } from "@/src/components/shared/WhatsAppButton"

interface ProductInfoProps {
  product: {
    name: string
    price: number
    comparePrice: number | null
    description: string | null
    material: string | null
    careInstructions: string | null
    category: { name: string }
    variants: Array<{
      size: { name: string; value: string } | null
      color: { name: string; value: string } | null
      stock: number
    }>
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const sizes = [...new Set(product.variants.filter((v) => v.size).map((v) => v.size!))]
  const colors = [...new Set(product.variants.filter((v) => v.color).map((v) => v.color!))]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
          {product.category.name}
        </p>
        <h1 className="text-3xl md:text-4xl font-heading text-white">{product.name}</h1>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl text-gold">{product.price.toFixed(2)} EGP</span>
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="text-sm text-white/30 line-through">
            {product.comparePrice.toFixed(2)} EGP
          </span>
        )}
      </div>

      {product.description && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">Description</h3>
          <p className="text-sm text-white/50 leading-relaxed">{product.description}</p>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <span
                key={size.value}
                className="border border-white/20 px-4 py-2 text-xs text-white/70 uppercase tracking-[0.1em]"
              >
                {size.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">Colors</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <div key={color.value} className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-full border border-white/20"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-xs text-white/50">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {product.material && (
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">Material</h3>
          <p className="text-sm text-white/50">{product.material}</p>
        </div>
      )}

      <WhatsAppButton
        text="Inquire About This Product"
        className="w-full justify-center"
      />
    </div>
  )
}
