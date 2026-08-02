import Link from "next/link"

import { crearNoticia } from "../actions"

export default function NuevaNoticiaPage() {
  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/noticias"
          className="inline-flex items-center font-semibold text-[#17666a] hover:text-[#f97316]"
        >
          ← Volver a Noticias
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Gestión de contenidos
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
            Nueva noticia
          </h1>

          <p className="mt-3 leading-7 text-[#405557]">
            Complete los campos para guardar la noticia como borrador o
            publicarla inmediatamente.
          </p>
        </div>

        <form
          action={crearNoticia}
          className="mt-8 space-y-8 rounded-2xl border border-[#d5dddd] bg-white p-6 shadow-sm sm:p-8"
        >
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
              placeholder="Escriba el título de la noticia"
              className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] outline-none transition placeholder:text-neutral-500 focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
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
              placeholder="Resumen breve que aparecerá en la tarjeta de la noticia"
              className="mt-2 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 py-3 leading-7 text-[#173f42] outline-none transition placeholder:text-neutral-500 focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
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
              placeholder="Escriba el contenido completo de la noticia"
              className="mt-2 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 py-3 leading-7 text-[#173f42] outline-none transition placeholder:text-neutral-500 focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
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
                defaultValue="Institucional"
                className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] outline-none focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
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
                placeholder="Nombre del autor"
                className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] outline-none placeholder:text-neutral-500 focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="imagen"
              className="block text-sm font-bold text-[#173f42]"
            >
              Imagen principal
            </label>

            <input
              id="imagen"
              name="imagen"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="mt-2 block w-full rounded-xl border border-dashed border-[#9eafb0] bg-[#f7f9f9] px-4 py-5 text-sm text-[#34494b] file:mr-4 file:rounded-lg file:border-0 file:bg-[#17666a] file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-[#0d5054]"
            />

            <p className="mt-2 text-sm text-[#526466]">
              Formatos permitidos: JPG, PNG o WEBP. Máximo 5 MB.
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
              defaultValue="borrador"
              className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] outline-none focus:border-[#17666a] focus:ring-2 focus:ring-[#17666a]/20 sm:max-w-sm"
            >
              <option value="borrador">
                Guardar como borrador
              </option>

              <option value="publicada">
                Publicar inmediatamente
              </option>

              <option value="archivada">
                Guardar como archivada
              </option>
            </select>

            <p className="mt-2 text-sm text-[#526466]">
              Al seleccionar “Publicar inmediatamente”, se registrará la
              fecha y hora actual.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#d5dddd] pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/admin/noticias"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bdc9ca] bg-white px-6 py-3 text-sm font-bold text-[#34494b] transition hover:bg-[#eef1f1]"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#17666a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d5054]"
            >
              Guardar noticia
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}