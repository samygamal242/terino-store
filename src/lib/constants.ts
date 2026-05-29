export const BRAND = {
  name: "TERINO",
  tagline: "Luxury Redefined",
  description: "Premium fashion for the discerning individual",
  email: "hello@terino.com",
  phone: "+201234567890",
  whatsapp: "201234567890",
  instagram: "https://instagram.com/terino",
  instagramHandle: "@terino",
  address: "Cairo, Egypt",
  footer:
    "TERINO is a luxury fashion brand offering premium shoes, sneakers, bags, and accessories.",
} as const

export const COLORS = {
  black: "#000000",
  gold: "#BFA14A",
  white: "#FFFFFF",
  dark: "#111111",
  darkGray: "#1A1A1A",
  mediumGray: "#2A2A2A",
  lightGray: "#999999",
  border: "#333333",
} as const

export const CATEGORIES = [
  { name: "Shoes", slug: "shoes", description: "Premium footwear collection" },
  { name: "Sneakers", slug: "sneakers", description: "Luxury sneakers" },
  { name: "Bags", slug: "bags", description: "Designer bags collection" },
  { name: "Accessories", slug: "accessories", description: "Luxury accessories" },
] as const

export const SIZES_SHOES = [
  { name: "EU 38", value: "38" },
  { name: "EU 39", value: "39" },
  { name: "EU 40", value: "40" },
  { name: "EU 41", value: "41" },
  { name: "EU 42", value: "42" },
  { name: "EU 43", value: "43" },
  { name: "EU 44", value: "44" },
  { name: "EU 45", value: "45" },
] as const

export const SIZES_BAGS = [
  { name: "Small", value: "small" },
  { name: "Medium", value: "medium" },
  { name: "Large", value: "large" },
] as const

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
] as const
