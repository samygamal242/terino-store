"use client"
export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-heading text-white mb-4">Admin Error</h1>
        <p className="text-white/50 text-sm mb-6">Something went wrong in the admin panel.</p>
        <button
          onClick={() => reset()}
          className="bg-gold text-black px-6 py-2 text-sm uppercase tracking-[0.15em]"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
