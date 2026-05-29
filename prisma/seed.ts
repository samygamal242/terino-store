import "dotenv/config"
import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const categories = [
  { name: "Shoes", slug: "shoes", description: "Premium footwear collection", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800", isFeatured: true, order: 1 },
  { name: "Sneakers", slug: "sneakers", description: "Luxury sneakers", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800", isFeatured: true, order: 2 },
  { name: "Bags", slug: "bags", description: "Designer bags collection", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800", isFeatured: true, order: 3 },
  { name: "Accessories", slug: "accessories", description: "Luxury accessories", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800", isFeatured: false, order: 4 },
]

const products = [
  {
    name: "Terino Oxford Classic",
    slug: "terino-oxford-classic",
    description: "Handcrafted Italian leather oxford shoes. Featuring premium calfskin leather, Blake stitch construction, and a leather sole with rubber insert for enhanced grip. Each pair is individually lasted and requires 8 weeks of craftsmanship.",
    price: 12800,
    categorySlug: "shoes",
    isFeatured: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857f0c8c3e?w=800",
      "https://images.unsplash.com/photo-1614252235316-8c857f0c8c3e?w=800",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    tags: ["leather", "formal", "oxford", "italian"],
    material: "Italian Calfskin Leather",
    careInstructions: "Professional leather care recommended. Store with shoe trees.",
  },
  {
    name: "Terino Loafer Suede",
    slug: "terino-loafer-suede",
    description: "Premium suede loafers with horse-bit detailing. Designed for the modern gentleman who appreciates refined elegance. Features a hand-stitched apron, leather lining, and a lightweight rubber sole.",
    price: 9500,
    comparePrice: 12000,
    categorySlug: "shoes",
    isFeatured: true,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800",
    ],
    sizes: ["39", "40", "41", "42", "43"],
    tags: ["suede", "loafer", "casual", "luxury"],
    material: "Premium Spanish Suede",
    careInstructions: "Brush regularly with a suede brush. Avoid water exposure. Use protective spray.",
  },
  {
    name: "Terino Monaco Sneaker",
    slug: "terino-monaco-sneaker",
    description: "Italian luxury sneakers crafted from the finest nappa leather. Features a sleek silhouette with gold-tone TERINO branding, perforated detailing, and a memory foam insole for unparalleled comfort.",
    price: 8500,
    categorySlug: "sneakers",
    isFeatured: true,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    tags: ["leather", "sneakers", "white", "italian"],
    material: "Nappa Leather",
    careInstructions: "Wipe with a damp cloth. Use leather cleaner for stains. Store in dust bag.",
  },
  {
    name: "Terino Court Low",
    slug: "terino-court-low",
    description: "Minimalist low-top sneakers in premium Argentinian leather. Inspired by classic tennis shoes, reimagined for luxury. Features gold foil TERINO logo, cotton laces, and a vulcanized rubber sole.",
    price: 7200,
    comparePrice: 9000,
    categorySlug: "sneakers",
    isFeatured: false,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    tags: ["leather", "low-top", "minimal", "white"],
    material: "Argentinian Leather",
    careInstructions: "Clean with a soft brush. Use leather balsam occasionally. Avoid machine washing.",
  },
  {
    name: "Terino Tote Canvas",
    slug: "terino-tote-canvas",
    description: "Exquisite canvas tote bag with leather trim. Spacious interior with a zip pocket and leather pouch. Double top handles with a detachable shoulder strap. Gold-toned hardware with engraved TERINO logo.",
    price: 15600,
    categorySlug: "bags",
    isFeatured: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    ],
    tags: ["tote", "canvas", "leather", "everyday"],
    material: "Waxed Canvas & Italian Leather",
    careInstructions: "Spot clean with mild soap. Avoid overloading. Store in dust bag when not in use.",
  },
  {
    name: "Terino Crossbody Mini",
    slug: "terino-crossbody-mini",
    description: "Compact crossbody bag crafted from pebbled leather. Features an adjustable strap, front flap with magnetic closure, and multiple interior card slots. Signature gold TERINO monogram on front.",
    price: 8200,
    categorySlug: "bags",
    isFeatured: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    ],
    tags: ["crossbody", "mini", "leather", "black"],
    material: "Pebbled Calfskin Leather",
    careInstructions: "Wipe with a soft dry cloth. Keep away from direct sunlight. Avoid contact with perfumes.",
  },
  {
    name: "Terino Silk Scarf",
    slug: "terino-silk-scarf",
    description: "Luxurious pure silk scarf with hand-rolled edges. Features an exclusive TERINO monogram pattern in gold and black. Can be worn as a neck scarf, headband, or bag accessory.",
    price: 3400,
    categorySlug: "accessories",
    isFeatured: true,
    isNewArrival: false,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800",
    ],
    tags: ["silk", "scarf", "accessory", "monogram"],
    material: "100% Pure Silk",
    careInstructions: "Dry clean only. Store flat in a drawer. Keep away from sharp objects.",
  },
  {
    name: "Terino Leather Belt",
    slug: "terino-leather-belt",
    description: "Full-grain Italian leather belt with a polished gold buckle. Reversible design with black on one side and brown on the other. Features subtle TERINO embossing on the interior.",
    price: 4800,
    categorySlug: "accessories",
    isFeatured: false,
    isNewArrival: true,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    ],
    tags: ["belt", "leather", "reversible", "gold"],
    material: "Full-Grain Italian Leather",
    careInstructions: "Wipe clean with damp cloth. Condition leather every 6 months. Store hanging or rolled.",
  },
]

const banners = [
  {
    title: "Summer Collection 2026",
    subtitle: "Discover the new season of luxury",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600",
    linkUrl: "/products",
    isActive: true,
    order: 1,
  },
  {
    title: "Handcrafted Excellence",
    subtitle: "Italian craftsmanship since 2024",
    imageUrl: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1600",
    linkUrl: "/products?category=shoes",
    isActive: true,
    order: 2,
  },
]

async function main() {
  console.log("Seeding TERINO database...")

  // Clear existing data
  await prisma.productImage.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.size.deleteMany()
  await prisma.color.deleteMany()
  await prisma.banner.deleteMany()
  await prisma.category.deleteMany()

  // Create categories
  const categoryMap: Record<string, string> = {}
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat })
    categoryMap[cat.slug] = created.id
    console.log(`  Created category: ${cat.name}`)
  }

  // Create sizes for shoe/sneaker categories
  const shoeSizeData = ["38", "39", "40", "41", "42", "43", "44", "45"]
  const sizeMap: Record<string, string> = {}

  for (const [slug, categoryId] of Object.entries(categoryMap)) {
    if (slug === "shoes" || slug === "sneakers") {
      for (const sizeVal of shoeSizeData) {
        const size = await prisma.size.create({
          data: { name: `EU ${sizeVal}`, value: sizeVal, categoryId },
        })
        sizeMap[`${slug}-${sizeVal}`] = size.id
      }
    }
  }

  // Create products
  for (const prod of products) {
    const { categorySlug, images, sizes, ...productData } = prod
    const categoryId = categoryMap[categorySlug]

    const product = await prisma.product.create({
      data: {
        ...productData,
        status: "ACTIVE",
        price: prod.price,
        comparePrice: prod.comparePrice ?? null,
        categoryId,
        tags: prod.tags,
        images: {
          create: images.map((url, i) => ({
            url,
            alt: `${prod.name} - Image ${i + 1}`,
            order: i,
          })),
        },
      },
    })

    // Create variants for shoe/sneaker products
    if (sizes && sizes.length > 0) {
      for (const sizeVal of sizes) {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            sizeId: sizeMap[`${categorySlug}-${sizeVal}`] ?? null,
            sku: `${prod.slug.toUpperCase().replace(/-/g, "_")}_${sizeVal}`,
            stock: Math.floor(Math.random() * 10) + 5,
            price: prod.price,
          },
        })
      }
    }

    console.log(`  Created product: ${prod.name}`)
  }

  // Create banners
  for (const banner of banners) {
    await prisma.banner.create({ data: banner })
    console.log(`  Created banner: ${banner.title}`)
  }

  console.log("\nSeeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
