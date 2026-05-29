import type { Metadata } from "next"
import { AboutContent } from "./AboutContent"

export const metadata: Metadata = {
  title: "About | TERINO",
  description:
    "Discover the story behind TERINO — a luxury fashion brand redefining elegance and sophistication.",
}

export default function AboutPage() {
  return <AboutContent />
}
