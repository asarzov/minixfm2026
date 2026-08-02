import Link from "next/link"

import { DeleteNewsButton } from "@/components/admin/delete-news-button"
import { createClient } from "@/lib/supabase/server"

import { eliminarNoticia } from "./actions"

export const dynamic = "force-dynamic"

type Noticia = {
  id: string
  titulo: string
  slug: string
  categoria: string
  autor: string
  estado: "borrador" | "publicada" | "archivada"
  fecha_publicacion: string | null
  created_at: string
}

const statusStyles = {
  borrador: "bg-amber-100 text-amber-800",
  publicada: "bg-emerald-100 text-emerald-800",
  archivada: "bg-neutral-200 text-neutral-700",
}

const statusLabels = {
  borrador: "Borrador",
  publicada: "Publicada",
  archivada: "Archivada",
}

function formatDate(value: string | null) {
  if (!value) {
    return "Sin publicar"
  }

  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date(value))
}

export default async function AdminNoticiasPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("noticias")
    .select(
      "id, titulo, slug, categoria, autor, estado, fecha_publicacion, created_at"
    )
    .order("created_at", {
      ascending: false,
    })

  const noticias = (data ?? []) as Noticia[]

  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Gestión de contenidos
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
              Noticias
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-[#405557]">
              Cree, revise y publique las noticias que aparecerán en MINIXFM.
            </p>
          </div>

          <Link
            href="/admin/noticias/nueva"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#17666a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d5054]"
          >
            + Nueva noticia
          </Link>
        </div>

        {error ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="font-semibold text-red-800">
              No fue posible cargar las noticias.
            </p>

            <p className="mt-2 text-sm text-red-700">
              {error.message}
            </p>
          </div>
        ) : null}

        {!error && noticias.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#d5dddd] bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7eeee] text-2xl">
              📰
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#173f42]">
              Todavía no existen noticias
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#405557]">
              Cree la primera noticia para comenzar a completar la portada y la
              sección de actualidad de MINIXFM.
            </p>

            <Link
              href="/admin/noticias/nueva"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#17666a] px-5 py-3 text-sm font-bold text-white hover:bg-[#0d5054]"
            >
              Crear primera noticia
            </Link>
          </div>
        ) : null}

        {noticias.length > 0 ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#d5dddd] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-left">
                <thead className="bg-[#eef1f1]">
                  <tr className="border-b border-[#d5dddd]">
                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Noticia
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Categoría
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Autor
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Estado
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Publicación
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-bold text-[#173f42]">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {noticias.map((noticia) => (
                    <tr
                      key={noticia.id}
                      className="border-b border-[#e3e8e8] last:border-b-0 hover:bg-[#fafbfb]"
                    >
                      <td className="px-5 py-5">
                        <p className="max-w-sm font-bold text-[#173f42]">
                          {noticia.titulo}
                        </p>

                        <p className="mt-1 text-xs text-[#526466]">
                          /noticias/{noticia.slug}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm text-[#34494b]">
                        {noticia.categoria}
                      </td>

                      <td className="px-5 py-5 text-sm text-[#34494b]">
                        {noticia.autor}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            statusStyles[noticia.estado]
                          }`}
                        >
                          {statusLabels[noticia.estado]}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm text-[#405557]">
                        {formatDate(noticia.fecha_publicacion)}
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex flex-wrap justify-end gap-2">
                          <Link
                            href={`/admin/noticias/${noticia.id}/editar`}
                            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#b9c8c9] bg-white px-3 py-2 text-sm font-semibold text-[#17666a] transition hover:bg-[#e8eeee]"
                          >
                            Editar
                          </Link>

                          {noticia.estado === "publicada" ? (
                            <Link
                              href={`/noticias/${noticia.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#b9c8c9] bg-white px-3 py-2 text-sm font-semibold text-[#34494b] transition hover:bg-[#eef1f1]"
                            >
                              Ver
                            </Link>
                          ) : null}

                          <form action={eliminarNoticia}>
                            <input
                              type="hidden"
                              name="id"
                              value={noticia.id}
                            />

                            <DeleteNewsButton />
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}