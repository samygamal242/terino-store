import { LoginForm } from "./LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-heading text-white">TERINO</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-2">Admin Login</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
