"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createProduct, updateProduct } from "@/src/actions/products"
import { ImageUploader } from "@/src/components/admin/ImageUploader"

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductImage {
  url: string
  alt: string | null
  order: number
}

interface ProductFormProps {
  product?: {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    comparePrice: number | null
    status: string
    isFeatured: boolean
    isNewArrival: boolean
    categoryId: string
    material: string | null
    careInstructions: string | null
    tags: string[]
    images: ProductImage[]
  }
  categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>(
    product?.images.map((i) => i.url) || []
  )

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const data = {
        name: formData.get("name") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string || undefined,
        price: formData.get("price") as string,
        comparePrice: formData.get("comparePrice") as string || undefined,
        categoryId: formData.get("categoryId") as string,
        status: (formData.get("status") as "DRAFT" | "ACTIVE" | "ARCHIVED") || "DRAFT",
        isFeatured: formData.get("isFeatured") === "on",
        isNewArrival: formData.get("isNewArrival") === "on",
        material: formData.get("material") as string || undefined,
        careInstructions: formData.get("careInstructions") as string || undefined,
        tags: (formData.get("tags") as string || "").split(",").filter(Boolean).map((t) => t.trim()),
        images: images.filter(Boolean).map((url) => ({ url, alt: formData.get("alt") as string || undefined })),
      }

      if (product) {
        await updateProduct(product.id, data)
      } else {
        await createProduct(data)
      }
      router.push("/admin/products")
      router.refresh()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Name</label>
          <input
            name="name"
            defaultValue={product?.name}
            required
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Slug</label>
          <input
            name="slug"
            defaultValue={product?.slug}
            required
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Description</label>
        <textarea
          name="description"
          defaultValue={product?.description || ""}
          rows={4}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Price (EGP)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product?.price}
            required
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Compare Price</label>
          <input
            name="comparePrice"
            type="number"
            step="0.01"
            defaultValue={product?.comparePrice || ""}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Category</label>
          <select
            name="categoryId"
            defaultValue={product?.categoryId}
            required
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-gold transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Material</label>
          <input
            name="material"
            defaultValue={product?.material || ""}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Tags (comma separated)</label>
          <input
            name="tags"
            defaultValue={product?.tags.join(", ") || ""}
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">Care Instructions</label>
        <textarea
          name="careInstructions"
          defaultValue={product?.careInstructions || ""}
          rows={3}
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.15em] text-white/40 block mb-2">
          Images
        </label>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            defaultChecked={product?.isFeatured}
            className="accent-gold"
          />
          <span className="text-xs text-white/60">Featured</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isNewArrival"
            defaultChecked={product?.isNewArrival}
            className="accent-gold"
          />
          <span className="text-xs text-white/60">New Arrival</span>
        </label>
        <div>
          <select
            name="status"
            defaultValue={product?.status || "DRAFT"}
            className="bg-white/5 border border-white/10 px-3 py-2 text-xs text-white/70 focus:outline-none focus:border-gold"
          >
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gold text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-white/20 text-white/60 px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
