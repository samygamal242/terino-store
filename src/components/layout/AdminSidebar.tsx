"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Tags,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
} from "lucide-react"

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/banners", label: "Banners", icon: ImageIcon },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-white/5 min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="text-xl font-heading tracking-[0.3em] text-white">
          TERINO
        </Link>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-gold/10 text-gold border-l-2 border-gold"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-white transition-colors"
        >
          <ExternalLink size={18} />
          View Site
        </Link>
        <Link
          href="/admin/logout"
          className="flex items-center gap-3 px-4 py-3 text-sm text-white/50 hover:text-red-400 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </aside>
  )
}
