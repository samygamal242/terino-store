import Link from "next/link"
import { prisma } from "@/src/lib/prisma"
import { Plus, Edit } from "lucide-react"
import { DeleteButton } from "./DeleteButton"

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      images: { orderBy: { order: "asc" }, take: 1 },
      _count: { select: { variants: true } },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading text-white">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-gold text-black px-4 py-2 text-sm uppercase tracking-[0.15em] font-medium hover:bg-white transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Product</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Category</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Price</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Status</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Variants</th>
              <th className="text-right py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 bg-cover bg-center shrink-0"
                      style={{
                        backgroundImage: `url(${product.images[0]?.url || ""})`,
                      }}
                    />
                    <span className="text-white text-sm">{product.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-white/50 text-sm">{product.category.name}</td>
                <td className="py-4 px-4 text-gold text-sm">{Number(product.price).toFixed(2)} EGP</td>
                <td className="py-4 px-4">
                  <span
                    className={`text-[10px] uppercase tracking-[0.1em] px-2 py-1 ${
                      product.status === "ACTIVE"
                        ? "bg-green-500/10 text-green-400"
                        : product.status === "DRAFT"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-white/10 text-white/40"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-white/50 text-sm">{product._count.variants}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-2 text-white/30 hover:text-gold transition-colors"
                    >
                      <Edit size={16} />
                    </Link>
                    <DeleteButton productId={product.id} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-white/30 text-sm">
                  No products yet. Create your first product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
