"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { prisma } from "@/src/lib/prisma"
import { createToken, verifyToken } from "@/src/lib/auth"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin) throw new Error("Invalid email or password")

  const valid = await bcrypt.compare(password, admin.passwordHash)
  if (!valid) throw new Error("Invalid email or password")

  const token = await createToken({ id: admin.id, email: admin.email, name: admin.name })
  const cookieStore = await cookies()
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  redirect("/admin")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
  redirect("/admin/login")
}

export async function getAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  if (!token) return null
  return verifyToken(token)
}
