import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "terino-dev-secret-change-in-production")

export interface AdminPayload {
  id: string
  email: string
  name: string
}

export async function createToken(payload: AdminPayload) {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}
