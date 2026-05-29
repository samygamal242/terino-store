import "dotenv/config"
import bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = "admin@terino.com"
  const password = "admin123"

  const existing = await prisma.admin.findUnique({ where: { email } })
  if (existing) {
    console.log("Admin already exists (update password?)")
    const confirm = process.argv.includes("--force")
    if (!confirm) {
      console.log("Use --force to overwrite password")
      process.exit(0)
    }
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name: "TERINO Admin" },
    create: {
      email,
      passwordHash,
      name: "TERINO Admin",
      role: "superadmin",
    },
  })

  console.log(`Admin created:`)
  console.log(`  Email:    ${email}`)
  console.log(`  Password: ${password}`)
  console.log("\nLogin at: http://localhost:3000/admin/login")

  await prisma.$disconnect()
}

main()
