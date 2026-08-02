import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

type NoticiaPageProps = {
  params: Promise<{
    slug: string
  }>
}

type Noticia = {
  titulo: string
  bajada: string
  contenido: string
  categoria: string
  autor: string
  imagen_principal: string | null
  fecha_publicacion: string | null
}

export const dynamic = "force-dynamic"

function formatDate(value: string | null) {
  if (!value) {
    return "Fecha no disponible"
  }

  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date(value))
}

export default async function NoticiaPage({
  params,
}: NoticiaPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("noticias")
    .select(
      "titulo, bajada, contenido, categoria, autor, imagen_principal, fecha_publicacion"
    )
    .eq("slug", slug)
    .eq("estado", "publicada")
    .single()

  if (error || !data) {
    notFound()
  }

  const noticia = data as Noticia

  return (
    <main>
      <article>
        <header className="border-b border-[#d5dddd] px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/noticias"
              className="font-semibold text-[#17666a] transition-colors hover:text-[#f97316]"
            >
              ← Volver a Noticias
            </Link>

            <p className="mt-10 text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
              {noticia.categoria}
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#173f42] sm:text-5xl lg:text-6xl">
              {noticia.titulo}
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-8 text-[#34494b]">
              {noticia.bajada}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#526466]">
              <span>Por {noticia.autor}</span>

              <span>
                {formatDate(noticia.fecha_publicacion)}
              </span>
            </div>
          </div>
        </header>

        <div className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-5xl">
            {noticia.imagen_principal ? (
              <figure className="mb-12">
                <div className="relative h-[360px] overflow-hidden rounded-2xl border border-[#d5dddd] bg-[#eef2f2] sm:h-[520px] lg:h-[650px]">
                  <Image
                    src={noticia.imagen_principal}
                    alt={`Imagen principal de ${noticia.titulo}`}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                    className="object-contain p-2 sm:p-4"
                  />
                </div>
              </figure>
            ) : null}

            <div className="whitespace-pre-line text-lg leading-9 text-[#34494b]">
              {noticia.contenido}
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}