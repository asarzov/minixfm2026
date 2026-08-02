import type { Metadata } from "next"

import { NewsCard } from "@/components/public/news-card"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Noticias, actividades y proyectos de MINIXFM Fundación.",
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

export default async function NoticiasPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("noticias")
    .select(
      "id, titulo, slug, bajada, categoria, imagen_principal, fecha_publicacion"
    )
    .eq("estado", "publicada")
    .order("fecha_publicacion", {
      ascending: false,
    })

  const noticias = (data ?? []) as Noticia[]

  return (
    <main>
      <section className="border-b border-[#d5dddd] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Actualidad MINIXFM
          </p>

          <h1 className="mt-4 text-4xl font-bold text-[#173f42] sm:text-5xl">
            Noticias
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#34494b]">
            Conozca las actividades, proyectos y acontecimientos vinculados
            con MINIXFM Fundación y nuestras comunidades.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
              No fue posible cargar las noticias.
            </div>
          ) : null}

          {!error && noticias.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
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
          ) : null}

          {!error && noticias.length === 0 ? (
            <div className="rounded-2xl border border-[#d5dddd] bg-white px-6 py-12 text-center">
              <h2 className="text-2xl font-bold text-[#173f42]">
                Próximamente
              </h2>

              <p className="mt-4 text-[#405557]">
                Todavía no existen noticias publicadas.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}