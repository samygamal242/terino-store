"use client"
import { Component } from "react"
import type { ReactNode } from "react"

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() { return { hasError: true } }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-heading text-white mb-4">Something went wrong</h1>
            <p className="text-white/50 text-sm mb-6">An unexpected error occurred.</p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
              className="bg-gold text-black px-6 py-2 text-sm uppercase tracking-[0.15em]"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
