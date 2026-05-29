"use server"

import { prisma } from "@/src/lib/prisma"

export async function submitContact(formData: FormData) {
  await prisma.contact.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    },
  })
}
