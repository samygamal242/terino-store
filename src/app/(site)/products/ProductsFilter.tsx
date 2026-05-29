"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { CATEGORIES, SORT_OPTIONS } from "@/src/lib/constants"

export function ProductsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category") || ""
  const currentSort = searchParams.get("sort") || ""
  const currentSearch = searchParams.get("search") || ""

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
        <input
          type="text"
          defaultValue={currentSearch}
          placeholder="Search products..."
          onChange={(e) => updateParam("search", e.target.value)}
          className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <select
        value={currentCategory}
        onChange={(e) => updateParam("category", e.target.value)}
        className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-gold transition-colors"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-gold transition-colors"
      >
        <option value="">Sort by</option>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
