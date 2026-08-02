import type { Metadata } from "next"
import Link from "next/link"

import { HomeBannerCarousel } from "@/components/public/home-banner-carousel"
import { NewsCard } from "@/components/public/news-card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "MINIXFM Fundación, radio comunitaria online de la Región de Coquimbo.",
}

export const dynamic = "force-dynamic"

type Noticia = {
  id: string
  titulo: string
  slug: string
  bajada: string
  categoria: string
  imagen_principal: string | null
  fecha_publicacion: string | null
}

export default async function HomePage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("noticias")
    .select(
      "id, titulo, slug, bajada, categoria, imagen_principal, fecha_publicacion"
    )
    .eq("estado", "publicada")
    .order("fecha_publicacion", {
      ascending: false,
    })
    .limit(3)

  const noticias = (data ?? []) as Noticia[]

  return (
    <main>
      <section className="px-4 py-5 sm:px-6 sm:py-7">
        <div className="mx-auto max-w-7xl">
          <HomeBannerCarousel />
        </div>
      </section>

      <section className="px-4 pb-20 pt-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
                Actualidad MINIXFM
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
                Noticias y actividades
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#34494b]">
                Conozca nuestros proyectos, actividades y contenidos más
                recientes.
              </p>
            </div>

            <Link
              href="/noticias"
              className="font-bold text-[#17666a] hover:text-[#f97316]"
            >
              Ver todas las noticias →
            </Link>
          </div>

          {noticias.length > 0 ? (
            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {noticias.map((noticia) => (
                <NewsCard
                  key={noticia.id}
                  title={noticia.titulo}
                  excerpt={noticia.bajada}
                  category={noticia.categoria}
                  slug={noticia.slug}
                  imageUrl={noticia.imagen_principal}
                  publishedAt={noticia.fecha_publicacion}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-[#d5dddd] bg-white px-6 py-12 text-center">
              <h3 className="text-2xl font-bold text-[#173f42]">
                Próximamente
              </h3>

              <p className="mt-3 text-[#405557]">
                Las noticias publicadas desde el panel aparecerán en este
                espacio.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-[#d5dddd] bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Punto de Cultura Comunitaria
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#173f42] sm:text-4xl">
              Comunicación al servicio de las personas y su territorio
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-[#34494b]">
              MINIXFM genera espacios de información, cultura, educación,
              patrimonio y participación, promoviendo el trabajo colaborativo
              junto a las comunidades de la Región de Coquimbo.
            </p>

            <Link
              href="/nosotros"
              className="mt-7 inline-flex font-bold text-[#17666a] hover:text-[#f97316]"
            >
              Conozca nuestra organización →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}