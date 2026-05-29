import Link from "next/link"
import { BRAND } from "@/src/lib/constants"
import { Camera, MessageCircle, ChevronRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-heading tracking-[0.3em] text-white mb-6">{BRAND.name}</h3>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">{BRAND.footer}</p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/80 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Products", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="text-sm text-white/50 hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={12} />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/80 mb-6">Categories</h4>
            <ul className="space-y-3">
              {["Shoes", "Sneakers", "Bags", "Accessories"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${cat.toLowerCase()}`}
                    className="text-sm text-white/50 hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <ChevronRight size={12} />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/80 mb-6">Connect</h4>
            <div className="flex flex-col gap-4">
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-gold transition-colors"
              >
                <Camera size={18} />
                Instagram
              </a>
              <p className="text-sm text-white/30 mt-2">{BRAND.address}</p>
              <p className="text-sm text-white/30">{BRAND.email}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/20">Luxury Redefined</p>
        </div>
      </div>
    </footer>
  )
}
