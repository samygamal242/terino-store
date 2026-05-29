import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const existing = await prisma.newsletter.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: "Already subscribed" })
    }

    await prisma.newsletter.create({ data: { email } })

    return NextResponse.json({ message: "Subscribed successfully" })
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
