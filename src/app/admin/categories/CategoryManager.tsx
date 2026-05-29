"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createCategory, updateCategory, deleteCategory } from "@/src/actions/categories"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface CategoryWithCount {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  isFeatured: boolean
  order: number
  _count: { products: number }
}

export function CategoryManager({ categories: initial }: { categories: CategoryWithCount[] }) {
  const router = useRouter()
  const [categories, setCategories] = useState(initial)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  async function handleCreate(formData: FormData) {
    await createCategory({
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string || undefined,
      image: formData.get("image") as string || undefined,
      isFeatured: false,
      order: 0,
    })
    setIsAdding(false)
    router.refresh()
  }

  async function handleUpdate(id: string, formData: FormData) {
    await updateCategory(id, {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: formData.get("description") as string || undefined,
      image: formData.get("image") as string || undefined,
    })
    setEditingId(null)
    router.refresh()
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category? Products in this category will be orphaned.")) return
    await deleteCategory(id)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setIsAdding(true)}
        className="flex items-center gap-2 bg-gold text-black px-4 py-2 text-sm uppercase tracking-[0.15em] font-medium hover:bg-white transition-colors"
      >
        <Plus size={16} />
        Add Category
      </button>

      {isAdding && (
        <form action={handleCreate} className="border border-white/10 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Category Name"
              required
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
            />
            <input
              name="slug"
              placeholder="category-slug"
              required
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
            />
          </div>
          <input
            name="description"
            placeholder="Description (optional)"
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
          />
          <input
            name="image"
            placeholder="Image URL (optional)"
            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-gold text-black px-4 py-2 text-sm uppercase tracking-[0.1em] hover:bg-white transition-colors"
            >
              <Save size={16} />
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="border border-white/20 text-white/60 px-4 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Name</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Slug</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Products</th>
              <th className="text-right py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) =>
              editingId === cat.id ? (
                <tr key={cat.id} className="border-b border-white/5">
                  <td colSpan={4} className="py-4 px-4">
                    <form action={handleUpdate.bind(null, cat.id)} className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          name="name"
                          defaultValue={cat.name}
                          required
                          className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
                        />
                        <input
                          name="slug"
                          defaultValue={cat.slug}
                          required
                          className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
                        />
                      </div>
                      <input
                        name="description"
                        defaultValue={cat.description || ""}
                        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-gold"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-gold text-black px-3 py-1.5 text-xs uppercase tracking-[0.1em]"
                        >
                          <Save size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="border border-white/20 text-white/60 px-3 py-1.5 text-xs"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              ) : (
                <tr key={cat.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-white">{cat.name}</td>
                  <td className="py-4 px-4 text-white/50">{cat.slug}</td>
                  <td className="py-4 px-4 text-white/50">{cat._count.products}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingId(cat.id)}
                        className="p-2 text-white/30 hover:text-gold transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
