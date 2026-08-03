import Image from "next/image"
import Link from "next/link"

import { DeleteBannerButton } from "@/components/admin/delete-banner-button"
import { createClient } from "@/lib/supabase/server"

import {
  actualizarVisibilidadCarrusel,
  eliminarBanner,
} from "./actions"

export const dynamic = "force-dynamic"

type Banner = {
  id: string
  titulo: string
  subtitulo: string | null
  imagen_principal: string | null
  orden: number
  activo: boolean
  created_at: string
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date(value))
}

export default async function AdminBannersPage() {
  const supabase = await createClient()

  /*
   * Recuperamos solamente los banners normales.
   * El banner de respaldo se edita desde una sección separada.
   */
  const { data, error } = await supabase
    .from("banners")
    .select(
      `
        id,
        titulo,
        subtitulo,
        imagen_principal,
        orden,
        activo,
        created_at
      `
    )
    .eq("es_respaldo", false)
    .order("orden", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    })

  const {
    data: siteConfig,
    error: configError,
  } = await supabase
    .from("configuracion_sitio")
    .select("mostrar_banners")
    .eq("id", "principal")
    .maybeSingle()

  const banners = (data ?? []) as Banner[]

  const mostrarBanners =
    siteConfig?.mostrar_banners ?? true

  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Gestión de portada
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
              Banners
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-[#405557]">
              Administre las imágenes y contenidos destacados del carrusel
              principal.
            </p>
          </div>

          <Link
            href="/admin/banners/nuevo"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#17666a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d5054]"
          >
            + Nuevo banner
          </Link>
        </div>

        <section className="mt-8 rounded-2xl border border-[#d5dddd] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f97316]">
                Configuración general
              </p>

              <h2 className="mt-2 text-xl font-bold text-[#173f42]">
                Carrusel principal
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#405557]">
                Puede ocultar completamente el carrusel o modificar el banner
                institucional que aparece cuando no existen otros banners
                activos.
              </p>

              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                    mostrarBanners
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {mostrarBanners
                    ? "Carrusel visible"
                    : "Carrusel oculto"}
                </span>
              </div>

              {configError ? (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                  No fue posible leer la configuración actual:{" "}
                  {configError.message}
                </div>
              ) : null}
            </div>

            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/admin/banners/respaldo/editar"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#17666a] bg-white px-5 py-2 text-sm font-bold text-[#17666a] transition hover:bg-[#eef7f7]"
              >
                Editar banner de respaldo
              </Link>

              <form
                action={actualizarVisibilidadCarrusel}
                className="flex flex-col gap-3"
              >
                <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-[#bdc9ca] bg-[#f7f9f9] px-4">
                  <input
                    name="mostrar_banners"
                    type="checkbox"
                    defaultChecked={mostrarBanners}
                    className="h-5 w-5 accent-[#17666a]"
                  />

                  <span className="font-semibold text-[#34494b]">
                    Mostrar banners en la portada
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={Boolean(configError)}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#17666a] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#0d5054] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Guardar configuración
                </button>
              </form>
            </div>
          </div>
        </section>

        {error ? (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
            No fue posible cargar los banners: {error.message}
          </div>
        ) : null}

        {!error && banners.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#d5dddd] bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e7eeee] text-2xl">
              🖼️
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#173f42]">
              Todavía no existen banners normales
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#405557]">
              Mientras no existan banners activos, la portada utilizará el
              banner institucional de respaldo.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/admin/banners/nuevo"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#17666a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d5054]"
              >
                Crear primer banner
              </Link>

              <Link
                href="/admin/banners/respaldo/editar"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#17666a] bg-white px-5 py-3 text-sm font-bold text-[#17666a] transition hover:bg-[#eef7f7]"
              >
                Editar banner de respaldo
              </Link>
            </div>
          </div>
        ) : null}

        {!error && banners.length > 0 ? (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#d5dddd] bg-white shadow-sm">
            <div className="border-b border-[#d5dddd] px-5 py-4">
              <h2 className="text-lg font-bold text-[#173f42]">
                Banners creados
              </h2>

              <p className="mt-1 text-sm text-[#526466]">
                Estos banners reemplazan temporalmente al banner de respaldo
                cuando están activos.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] border-collapse text-left">
                <thead className="bg-[#eef1f1]">
                  <tr className="border-b border-[#d5dddd]">
                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Imagen
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Banner
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Orden
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Estado
                    </th>

                    <th className="px-5 py-4 text-sm font-bold text-[#173f42]">
                      Creación
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-bold text-[#173f42]">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {banners.map((banner) => (
                    <tr
                      key={banner.id}
                      className="border-b border-[#e3e8e8] last:border-b-0 hover:bg-[#fafbfb]"
                    >
                      <td className="px-5 py-5">
                        <div className="relative h-20 w-36 overflow-hidden rounded-xl bg-[#e8eeee]">
                          {banner.imagen_principal ? (
                            <Image
                              src={banner.imagen_principal}
                              alt={`Vista previa del banner ${banner.titulo}`}
                              fill
                              sizes="144px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs font-semibold text-[#526466]">
                              Sin imagen
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <p className="max-w-sm font-bold text-[#173f42]">
                          {banner.titulo}
                        </p>

                        <p className="mt-1 text-sm text-[#526466]">
                          {banner.subtitulo || "Sin subtítulo"}
                        </p>
                      </td>

                      <td className="px-5 py-5 font-bold text-[#17666a]">
                        {banner.orden}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            banner.activo
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-neutral-200 text-neutral-700"
                          }`}
                        >
                          {banner.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm text-[#405557]">
                        {formatDate(banner.created_at)}
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/banners/${banner.id}/editar`}
                            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-[#b9c8c9] bg-white px-3 py-2 text-sm font-semibold text-[#17666a] transition hover:bg-[#e8eeee]"
                          >
                            Editar
                          </Link>

                          <form action={eliminarBanner}>
                            <input
                              type="hidden"
                              name="id"
                              value={banner.id}
                            />

                            <DeleteBannerButton />
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