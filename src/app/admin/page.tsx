import { prisma } from "@/src/lib/prisma"

export default async function AdminDashboard() {
  const [products, categories, contacts, newsletters] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.contact.count({ where: { isRead: false } }),
    prisma.newsletter.count(),
  ])

  const stats = [
    { label: "Total Products", value: products },
    { label: "Categories", value: categories },
    { label: "Unread Messages", value: contacts },
    { label: "Newsletter Subscribers", value: newsletters },
  ]

  return (
    <div>
      <h1 className="text-2xl font-heading text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-white/10 p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">{stat.label}</p>
            <p className="text-3xl font-heading text-gold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
