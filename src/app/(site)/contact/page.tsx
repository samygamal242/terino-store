import type { Metadata } from "next"
import { ContactContent } from "./ContactContent"

export const metadata: Metadata = {
  title: "Contact | TERINO",
  description: "Get in touch with TERINO via WhatsApp, Instagram, or our contact form.",
}

export default function ContactPage() {
  return <ContactContent />
}
