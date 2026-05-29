"use client"
import { useState } from "react"
import { login } from "@/src/actions/auth"

export function LoginForm() {
  const [error, setError] = useState("")

  async function handleSubmit(formData: FormData) {
    setError("")
    try {
      await login(formData)
    } catch {
      setError("Invalid email or password")
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        className="w-full bg-gold text-black py-3 text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-300"
      >
        Sign In
      </button>
    </form>
  )
}
