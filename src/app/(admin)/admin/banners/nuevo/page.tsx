import Link from "next/link"

import { BannerForm } from "@/components/admin/banner-form"

import { crearBanner } from "../actions"

export default function NuevoBannerPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/banners"
          className="font-semibold text-[#17666a] hover:text-[#f97316]"
        >
          ← Volver a Banners
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Gestión de portada
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
            Nuevo banner
          </h1>

          <p className="mt-3 leading-7 text-[#405557]">
            Suba una imagen y configure el contenido que aparecerá en el
            carrusel principal.
          </p>
        </div>

        <BannerForm
          action={crearBanner}
          submitLabel="Crear banner"
          requireImage
        />
      </div>
    </main>
  )
}