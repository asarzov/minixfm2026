import Link from "next/link"
import { notFound } from "next/navigation"

import { BannerForm } from "@/components/admin/banner-form"
import { createClient } from "@/lib/supabase/server"

import { actualizarBanner } from "../../actions"

export const dynamic = "force-dynamic"

type ColorStyle =
  | "institucional"
  | "oscuro"
  | "calido"
  | "claro"
  | "personalizado"

type BannerRespaldo = {
  id: string
  subtitulo: string | null
  titulo: string
  descripcion: string | null
  imagen_principal: string | null
  texto_boton: string | null
  enlace_boton: string | null
  posicion_imagen: string | null
  orden: number
  activo: boolean
  estilo_color: ColorStyle | null
  color_gradiente_inicio: string | null
  color_gradiente_fin: string | null
  opacidad_gradiente: number | null
  color_texto: string | null
  color_boton: string | null
  color_texto_boton: string | null
  es_respaldo: boolean
}

export default async function EditarBannerRespaldoPage() {
  const supabase = await createClient()

  const {
    data,
    error,
  } = await supabase
    .from("banners")
    .select(`
      id,
      subtitulo,
      titulo,
      descripcion,
      imagen_principal,
      texto_boton,
      enlace_boton,
      posicion_imagen,
      orden,
      activo,
      estilo_color,
      color_gradiente_inicio,
      color_gradiente_fin,
      opacidad_gradiente,
      color_texto,
      color_boton,
      color_texto_boton,
      es_respaldo
    `)
    .eq("es_respaldo", true)
    .maybeSingle()

  if (error) {
    throw new Error(
      `No fue posible cargar el banner de respaldo: ${error.message}`
    )
  }

  if (!data) {
    notFound()
  }

  const banner = data as BannerRespaldo

  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin/banners"
          className="font-semibold text-[#17666a] transition hover:text-[#f97316]"
        >
          ← Volver a Banners
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Configuración de portada
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
            Editar banner de respaldo
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-[#405557]">
            Este contenido aparecerá cuando el carrusel principal esté
            habilitado y no existan banners normales activos.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#b7d5d6] bg-[#eef7f7] p-5">
          <h2 className="font-bold text-[#173f42]">
            Funcionamiento automático
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#405557]">
            El banner de respaldo no necesita orden ni activación individual.
            Puede funcionar solamente con un fondo de color o incorporar una
            imagen de portada.
          </p>
        </div>

        <BannerForm
          action={actualizarBanner}
          submitLabel="Guardar banner de respaldo"
          esRespaldo
          initialData={{
            id: banner.id,

            subtitulo:
              banner.subtitulo ??
              "MINIXFM Fundación",

            titulo:
              banner.titulo,

            descripcion:
              banner.descripcion ?? "",

            imageUrl:
              banner.imagen_principal,

            textoBoton:
              banner.texto_boton ?? "",

            enlaceBoton:
              banner.enlace_boton ?? "",

            posicionImagen:
              banner.posicion_imagen ??
              "center center",

            orden: 1,
            activo: true,

            estiloColor:
              banner.estilo_color ??
              "institucional",

            colorGradienteInicio:
              banner.color_gradiente_inicio ??
              "#001f21",

            colorGradienteFin:
              banner.color_gradiente_fin ??
              "#17666a",

            opacidadGradiente:
              banner.opacidad_gradiente ??
              95,

            colorTexto:
              banner.color_texto ??
              "#ffffff",

            colorBoton:
              banner.color_boton ??
              "#ffffff",

            colorTextoBoton:
              banner.color_texto_boton ??
              "#173f42",
          }}
        />
      </div>
    </main>
  )
}