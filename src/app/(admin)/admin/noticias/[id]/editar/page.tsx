import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

import { actualizarNoticia } from "../../actions"

type EditarNoticiaPageProps = {
  params: Promise<{
    id: string
  }>
}

type Noticia = {
  id: string
  titulo: string
  bajada: string
  contenido: string
  categoria: string
  autor: string
  estado: "borrador" | "publicada" | "archivada"
  imagen_principal: string | null
}

export const dynamic = "force-dynamic"

export default async function EditarNoticiaPage({
  params,
}: EditarNoticiaPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("noticias")
    .select(
      "id, titulo, bajada, contenido, categoria, autor, estado, imagen_principal"
    )
    .eq("id", id)
    .single()

  if (error || !data) {
    notFound()
  }

  const noticia = data as Noticia

  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/noticias"
          className="font-semibold text-[#17666a] hover:text-[#f97316]"
        >
          ← Volver a Noticias
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Gestión de contenidos
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
            Editar noticia
          </h1>

          <p className="mt-3 leading-7 text-[#405557]">
            Modifique la información, la imagen o el estado de publicación.
          </p>
        </div>

        <form
          action={actualizarNoticia}
          className="mt-8 space-y-8 rounded-2xl border border-[#d5dddd] bg-white p-6 shadow-sm sm:p-8"
        >
          <input type="hidden" name="id" value={noticia.id} />

          <div>
            <label
              htmlFor="titulo"
              className="block text-sm font-bold text-[#173f42]"
            >
              Título
            </label>

            <input
              id="titulo"
              name="titulo"
              type="text"
              required
              maxLength={180}
              defaultValue={noticia.titulo}
              className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] outline-none focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
            />
          </div>

          <div>
            <label
              htmlFor="bajada"
              className="block text-sm font-bold text-[#173f42]"
            >
              Bajada o resumen
            </label>

            <textarea
              id="bajada"
              name="bajada"
              required
              maxLength={320}
              rows={4}
              defaultValue={noticia.bajada}
              className="mt-2 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 py-3 leading-7 text-[#173f42] outline-none focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
            />
          </div>

          <div>
            <label
              htmlFor="contenido"
              className="block text-sm font-bold text-[#173f42]"
            >
              Contenido
            </label>

            <textarea
              id="contenido"
              name="contenido"
              required
              rows={14}
              defaultValue={noticia.contenido}
              className="mt-2 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 py-3 leading-7 text-[#173f42] outline-none focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="categoria"
                className="block text-sm font-bold text-[#173f42]"
              >
                Categoría
              </label>

              <select
                id="categoria"
                name="categoria"
                defaultValue={noticia.categoria}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42]"
              >
                <option value="Institucional">Institucional</option>
                <option value="Cultura">Cultura</option>
                <option value="Comunidad">Comunidad</option>
                <option value="Talleres">Talleres</option>
                <option value="Programación">Programación</option>
                <option value="Patrimonio">Patrimonio</option>
                <option value="Entrevistas">Entrevistas</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="autor"
                className="block text-sm font-bold text-[#173f42]"
              >
                Autor
              </label>

              <input
                id="autor"
                name="autor"
                type="text"
                required
                maxLength={120}
                defaultValue={noticia.autor}
                className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42]"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-[#173f42]">
              Imagen actual
            </p>

            {noticia.imagen_principal ? (
              <div className="relative mt-3 aspect-video max-w-xl overflow-hidden rounded-xl bg-[#e8eeee]">
                <Image
                  src={noticia.imagen_principal}
                  alt={`Imagen actual de ${noticia.titulo}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#526466]">
                Esta noticia no tiene una imagen asignada.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="imagen"
              className="block text-sm font-bold text-[#173f42]"
            >
              Reemplazar imagen
            </label>

            <input
              id="imagen"
              name="imagen"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="mt-2 block w-full rounded-xl border border-dashed border-[#9eafb0] bg-[#f7f9f9] px-4 py-5 text-sm text-[#34494b] file:mr-4 file:rounded-lg file:border-0 file:bg-[#17666a] file:px-4 file:py-2 file:font-bold file:text-white"
            />

            <p className="mt-2 text-sm text-[#526466]">
              Déjelo vacío para conservar la imagen actual.
            </p>
          </div>

          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-bold text-[#173f42]"
            >
              Estado
            </label>

            <select
              id="estado"
              name="estado"
              defaultValue={noticia.estado}
              className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] sm:max-w-sm"
            >
              <option value="borrador">Borrador</option>
              <option value="publicada">Publicada</option>
              <option value="archivada">Archivada</option>
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#d5dddd] pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/noticias"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bdc9ca] px-6 py-3 text-sm font-bold text-[#34494b] hover:bg-[#eef1f1]"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#17666a] px-6 py-3 text-sm font-bold text-white hover:bg-[#0d5054]"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}