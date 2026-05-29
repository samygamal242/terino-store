import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({ orderBy: { order: "asc" } })

  async function createBanner(formData: FormData) {
    "use server"
    await prisma.banner.create({
      data: {
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        imageUrl: formData.get("imageUrl") as string,
        linkUrl: formData.get("linkUrl") as string,
        isActive: formData.get("isActive") === "on",
      },
    })
    revalidatePath("/admin/banners")
  }

  async function deleteBanner(id: string) {
    "use server"
    await prisma.banner.delete({ where: { id } })
    revalidatePath("/admin/banners")
  }

  return (
    <div>
      <h1 className="text-2xl font-heading text-white mb-8">Banners</h1>

      <form action={createBanner} className="border border-white/10 p-6 space-y-4 mb-8">
        <h2 className="text-sm uppercase tracking-[0.15em] text-white/60">New Banner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Title"
            className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
          />
          <input
            name="subtitle"
            placeholder="Subtitle"
            className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
          />
        </div>
        <input
          name="imageUrl"
          placeholder="Image URL"
          required
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
        />
        <input
          name="linkUrl"
          placeholder="Link URL (optional)"
          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold"
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isActive" defaultChecked className="accent-gold" />
          <span className="text-xs text-white/60">Active</span>
        </label>
        <button
          type="submit"
          className="bg-gold text-black px-6 py-2 text-sm uppercase tracking-[0.15em] font-medium hover:bg-white transition-colors"
        >
          Add Banner
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="border border-white/10 overflow-hidden">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-white">{banner.title || "Untitled"}</h3>
                <span
                  className={`text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 ${
                    banner.isActive ? "bg-green-500/10 text-green-400" : "bg-white/10 text-white/40"
                  }`}
                >
                  {banner.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {banner.subtitle && (
                <p className="text-xs text-white/40 mb-2">{banner.subtitle}</p>
              )}
              <form action={deleteBanner.bind(null, banner.id)}>
                <button
                  type="submit"
                  className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {banners.length === 0 && (
          <div className="col-span-full text-center py-12 text-white/30 text-sm">
            No banners yet.
          </div>
        )}
      </div>
    </div>
  )
}
