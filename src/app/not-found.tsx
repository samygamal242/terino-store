import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">404</p>
        <h1 className="text-5xl md:text-7xl font-heading text-white mb-4">Page Not Found</h1>
        <p className="text-white/40 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold text-black px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
