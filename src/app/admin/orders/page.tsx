import Link from "next/link"
import { prisma } from "@/src/lib/prisma"
import { Eye } from "lucide-react"

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { items: true } } },
    take: 100,
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading text-white">Orders ({orders.length})</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Order</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Customer</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Email</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Items</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Total</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Status</th>
              <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Date</th>
              <th className="text-right py-3 px-4 text-white/40 text-xs uppercase tracking-[0.15em]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 text-white text-sm font-mono">{order.orderNumber}</td>
                <td className="py-4 px-4 text-white/70 text-sm">{order.customerName}</td>
                <td className="py-4 px-4 text-white/50 text-sm">{order.customerEmail}</td>
                <td className="py-4 px-4 text-white/50 text-sm">{order._count.items}</td>
                <td className="py-4 px-4 text-gold text-sm">{Number(order.total).toFixed(2)} EGP</td>
                <td className="py-4 px-4">
                  <span
                    className={`text-[10px] uppercase tracking-[0.1em] px-2 py-1 ${
                      order.status === "PENDING"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : order.status === "CONFIRMED"
                          ? "bg-blue-500/10 text-blue-400"
                          : order.status === "SHIPPED"
                            ? "bg-purple-500/10 text-purple-400"
                            : order.status === "DELIVERED"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-white/40 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="p-2 text-white/30 hover:text-gold transition-colors inline-block"
                  >
                    <Eye size={16} />
                  </Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="py-12 text-center text-white/30 text-sm">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
