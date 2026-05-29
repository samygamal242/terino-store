import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

const adminPaths = ["/admin"]
const publicAdminPaths = ["/admin/login"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isAdminPath = adminPaths.some((p) => path.startsWith(p))
  if (!isAdminPath) return NextResponse.next()

  const isPublicAdminPath = publicAdminPaths.some((p) => path === p)
  if (isPublicAdminPath) return NextResponse.next()

  const token = request.cookies.get("admin_token")?.value
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
