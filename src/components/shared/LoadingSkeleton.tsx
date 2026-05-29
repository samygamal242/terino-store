export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-white/5" />
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-white/10 w-3/4" />
        <div className="h-4 bg-white/10 w-1/2" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="h-screen w-full bg-white/5 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="h-4 w-24 bg-white/10 mx-auto mb-6" />
        <div className="h-16 w-96 bg-white/10 mx-auto mb-4" />
        <div className="h-4 w-64 bg-white/10 mx-auto" />
      </div>
    </div>
  )
}
