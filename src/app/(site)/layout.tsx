import { Header } from "@/src/components/layout/Header"
import { Footer } from "@/src/components/layout/Footer"
import { ScrollToTop } from "@/src/components/shared/ScrollToTop"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
