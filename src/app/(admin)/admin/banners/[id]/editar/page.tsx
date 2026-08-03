import Link from "next/link"
import { notFound } from "next/navigation"

import { BannerForm } from "@/components/admin/banner-form"
import { createClient } from "@/lib/supabase/server"

import { actualizarBanner } from "../../actions"

type EditarBannerPageProps = {
  params: Promise<{
    id: string
  }>
}

export const dynamic = "force-dynamic"

export default async function EditarBannerPage({
  params,
}: EditarBannerPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: banner, error } = await supabase
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
      color_texto_boton
    `)
    .eq("id", id)
    .single()

  if (error || !banner) {
    notFound()
  }

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
            Editar banner
          </h1>

          <p className="mt-3 leading-7 text-[#405557]">
            Modifique la imagen, los colores, el contenido,
            el orden o el estado del banner.
          </p>
        </div>

        <BannerForm
          action={actualizarBanner}
          submitLabel="Guardar cambios"
          initialData={{
            id: banner.id,
            subtitulo: banner.subtitulo,
            titulo: banner.titulo,
            descripcion: banner.descripcion,
            imageUrl: banner.imagen_principal,
            textoBoton: banner.texto_boton,
            enlaceBoton: banner.enlace_boton,
            posicionImagen: banner.posicion_imagen,
            orden: banner.orden,
            activo: banner.activo,

            estiloColor: banner.estilo_color,
            colorGradienteInicio:
              banner.color_gradiente_inicio,
            colorGradienteFin:
              banner.color_gradiente_fin,
            opacidadGradiente:
              banner.opacidad_gradiente,
            colorTexto: banner.color_texto,
            colorBoton: banner.color_boton,
            colorTextoBoton:
              banner.color_texto_boton,
          }}
        />
      </div>
    </main>
  )
}