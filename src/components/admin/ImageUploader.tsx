"use client"
import { useState, useRef } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (data.url) {
        onChange([...images, data.url])
      }
    } catch (err) {
      console.error("Upload failed:", err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div key={i} className="relative w-24 h-24 bg-white/5 border border-white/10 overflow-hidden group">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${url})` }}
            />
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-black/70 p-0.5 text-white/70 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <label className="w-24 h-24 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors">
          {uploading ? (
            <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Upload size={18} className="text-white/40 mb-1" />
              <span className="text-[10px] text-white/30">Upload</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  )
}
