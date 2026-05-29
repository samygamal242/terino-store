import { MessageCircle } from "lucide-react"
import { BRAND } from "@/src/lib/constants"

interface WhatsAppButtonProps {
  text?: string
  className?: string
}

export function WhatsAppButton({
  text = "Inquire via WhatsApp",
  className = "",
}: WhatsAppButtonProps) {
  const message = encodeURIComponent("Hello! I'm interested in a product from TERINO.")
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 text-sm uppercase tracking-[0.15em] hover:bg-[#20BD5A] transition-all duration-300 ${className}`}
    >
      <MessageCircle size={18} />
      {text}
    </a>
  )
}
