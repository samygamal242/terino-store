"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ProductGalleryProps {
  images: { url: string; alt: string | null }[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images.length) {
    return (
      <div className="aspect-[3/4] bg-white/5 flex items-center justify-center text-white/20">
        No images available
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[selectedIndex].url})` }}
          />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 w-20 h-20 bg-cover bg-center border-2 transition-colors ${
                i === selectedIndex ? "border-gold" : "border-transparent hover:border-white/30"
              }`}
              style={{ backgroundImage: `url(${img.url})` }}
              aria-label={`View ${img.alt || name} image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
