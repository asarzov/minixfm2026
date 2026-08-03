"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createClient } from "@/lib/supabase/server"

const MAX_IMAGE_SIZE = 5 * 1024 * 1024

const allowedImageTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

const allowedImagePositions = [
  "center center",
  "center top",
  "center bottom",
  "left center",
  "right center",
]

const allowedColorStyles = [
  "institucional",
  "oscuro",
  "calido",
  "claro",
  "personalizado",
]

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

function isValidHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value)
}

async function getAuthenticatedClient() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  return supabase
}

function getBannerFields(formData: FormData) {
  const subtitulo = String(formData.get("subtitulo") ?? "").trim()
  const titulo = String(formData.get("titulo") ?? "").trim()
  const descripcion = String(formData.get("descripcion") ?? "").trim()

  const textoBoton = String(
    formData.get("texto_boton") ?? ""
  ).trim()

  const enlaceBoton = String(
    formData.get("enlace_boton") ?? ""
  ).trim()

  const posicionImagen = String(
    formData.get("posicion_imagen") ?? "center center"
  )

  const orden = Number(formData.get("orden") ?? 1)
  const activo = formData.get("activo") === "on"

  const estiloColor = String(
    formData.get("estilo_color") ?? "institucional"
  )

  const colorGradienteInicio = String(
    formData.get("color_gradiente_inicio") ?? "#001f21"
  )

  const colorGradienteFin = String(
    formData.get("color_gradiente_fin") ?? "#003f42"
  )

  const opacidadGradiente = Number(
    formData.get("opacidad_gradiente") ?? 90
  )

  const colorTexto = String(
    formData.get("color_texto") ?? "#ffffff"
  )

  const colorBoton = String(
    formData.get("color_boton") ?? "#ffffff"
  )

  const colorTextoBoton = String(
    formData.get("color_texto_boton") ?? "#173f42"
  )

  if (!titulo) {
    throw new Error("Debe ingresar el título del banner.")
  }

  if (titulo.length > 120) {
    throw new Error(
      "El título no puede superar los 120 caracteres."
    )
  }

  if (descripcion.length > 240) {
    throw new Error(
      "La descripción no puede superar los 240 caracteres."
    )
  }

  if (!Number.isInteger(orden) || orden < 1) {
    throw new Error(
      "El orden debe ser un número entero mayor o igual a 1."
    )
  }

  if (!allowedImagePositions.includes(posicionImagen)) {
    throw new Error(
      "La posición seleccionada para la imagen no es válida."
    )
  }

  if (!allowedColorStyles.includes(estiloColor)) {
    throw new Error(
      "El estilo de color seleccionado no es válido."
    )
  }

  if (
    !Number.isInteger(opacidadGradiente) ||
    opacidadGradiente < 0 ||
    opacidadGradiente > 100
  ) {
    throw new Error(
      "La intensidad del gradiente debe estar entre 0 y 100."
    )
  }

  const colors = [
    colorGradienteInicio,
    colorGradienteFin,
    colorTexto,
    colorBoton,
    colorTextoBoton,
  ]

  if (colors.some((color) => !isValidHexColor(color))) {
    throw new Error(
      "Uno o más colores tienen un formato incorrecto."
    )
  }

  if (
    (textoBoton && !enlaceBoton) ||
    (!textoBoton && enlaceBoton)
  ) {
    throw new Error(
      "El texto y el enlace del botón deben completarse conjuntamente."
    )
  }

  if (enlaceBoton) {
    const isInternalLink = enlaceBoton.startsWith("/")

    const isExternalLink =
      enlaceBoton.startsWith("https://") ||
      enlaceBoton.startsWith("http://")

    if (!isInternalLink && !isExternalLink) {
      throw new Error(
        "El enlace debe comenzar con /, https:// o http://."
      )
    }
  }

  return {
    subtitulo,
    titulo,
    descripcion,
    textoBoton,
    enlaceBoton,
    posicionImagen,
    orden,
    activo,
    estiloColor,
    colorGradienteInicio,
    colorGradienteFin,
    opacidadGradiente,
    colorTexto,
    colorBoton,
    colorTextoBoton,
  }
}

async function uploadBannerImage(
  supabase: SupabaseServerClient,
  image: File
) {
  if (!allowedImageTypes[image.type]) {
    throw new Error(
      "La imagen debe estar en formato JPG, PNG o WEBP."
    )
  }

  if (image.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "La imagen no puede superar los 5 MB."
    )
  }

  const extension = allowedImageTypes[image.type]
  const path = `portadas/${crypto.randomUUID()}.${extension}`
  const imageBuffer = new Uint8Array(await image.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from("banners")
    .upload(path, imageBuffer, {
      contentType: image.type,
      cacheControl: "3600",
      upsert: false,
    })

  if (uploadError) {
    throw new Error(
      `No fue posible subir la imagen: ${uploadError.message}`
    )
  }

  const { data } = supabase.storage
    .from("banners")
    .getPublicUrl(path)

  return {
    path,
    publicUrl: data.publicUrl,
  }
}

function revalidateBannerPages() {
  revalidatePath("/")
  revalidatePath("/admin/banners")
}

export async function crearBanner(formData: FormData) {
  const supabase = await getAuthenticatedClient()
  const fields = getBannerFields(formData)

  const image = formData.get("imagen")

  if (!(image instanceof File) || image.size === 0) {
    throw new Error(
      "Debe seleccionar una imagen para el banner."
    )
  }

  const uploadedImage = await uploadBannerImage(
    supabase,
    image
  )

  const { error } = await supabase.from("banners").insert({
    subtitulo: fields.subtitulo,
    titulo: fields.titulo,
    descripcion: fields.descripcion,
    imagen_principal: uploadedImage.publicUrl,
    imagen_path: uploadedImage.path,
    texto_boton: fields.textoBoton,
    enlace_boton: fields.enlaceBoton,
    posicion_imagen: fields.posicionImagen,
    orden: fields.orden,
    activo: fields.activo,

    estilo_color: fields.estiloColor,
    color_gradiente_inicio: fields.colorGradienteInicio,
    color_gradiente_fin: fields.colorGradienteFin,
    opacidad_gradiente: fields.opacidadGradiente,
    color_texto: fields.colorTexto,
    color_boton: fields.colorBoton,
    color_texto_boton: fields.colorTextoBoton,
  })

  if (error) {
    await supabase.storage
      .from("banners")
      .remove([uploadedImage.path])

    throw new Error(
      `No fue posible guardar el banner: ${error.message}`
    )
  }

  revalidateBannerPages()
  redirect("/admin/banners")
}

export async function actualizarBanner(
  formData: FormData
) {
  const supabase = await getAuthenticatedClient()
  const fields = getBannerFields(formData)

  const id = String(formData.get("id") ?? "").trim()

  if (!id) {
    throw new Error(
      "No se encontró el identificador del banner."
    )
  }

  const { data: currentBanner, error: fetchError } =
    await supabase
      .from("banners")
      .select("imagen_principal, imagen_path")
      .eq("id", id)
      .single()

  if (fetchError || !currentBanner) {
    throw new Error(
      `No fue posible encontrar el banner: ${
        fetchError?.message ?? "Banner inexistente"
      }`
    )
  }

  let imageUrl = currentBanner.imagen_principal
  let imagePath = currentBanner.imagen_path
  let newImagePath: string | null = null

  const image = formData.get("imagen")

  if (image instanceof File && image.size > 0) {
    const uploadedImage = await uploadBannerImage(
      supabase,
      image
    )

    imageUrl = uploadedImage.publicUrl
    imagePath = uploadedImage.path
    newImagePath = uploadedImage.path
  }

  const { error: updateError } = await supabase
    .from("banners")
    .update({
      subtitulo: fields.subtitulo,
      titulo: fields.titulo,
      descripcion: fields.descripcion,
      imagen_principal: imageUrl,
      imagen_path: imagePath,
      texto_boton: fields.textoBoton,
      enlace_boton: fields.enlaceBoton,
      posicion_imagen: fields.posicionImagen,
      orden: fields.orden,
      activo: fields.activo,

      estilo_color: fields.estiloColor,
      color_gradiente_inicio: fields.colorGradienteInicio,
      color_gradiente_fin: fields.colorGradienteFin,
      opacidad_gradiente: fields.opacidadGradiente,
      color_texto: fields.colorTexto,
      color_boton: fields.colorBoton,
      color_texto_boton: fields.colorTextoBoton,
    })
    .eq("id", id)

  if (updateError) {
    if (newImagePath) {
      await supabase.storage
        .from("banners")
        .remove([newImagePath])
    }

    throw new Error(
      `No fue posible actualizar el banner: ${updateError.message}`
    )
  }

  if (
    newImagePath &&
    currentBanner.imagen_path &&
    currentBanner.imagen_path !== newImagePath
  ) {
    await supabase.storage
      .from("banners")
      .remove([currentBanner.imagen_path])
  }

  revalidateBannerPages()
  redirect("/admin/banners")
}

export async function eliminarBanner(
  formData: FormData
) {
  const supabase = await getAuthenticatedClient()

  const id = String(formData.get("id") ?? "").trim()

  if (!id) {
    throw new Error(
      "No se encontró el identificador del banner."
    )
  }

  const { data: banner, error: fetchError } =
    await supabase
      .from("banners")
      .select("imagen_path")
      .eq("id", id)
      .single()

  if (fetchError || !banner) {
    throw new Error(
      `No fue posible encontrar el banner: ${
        fetchError?.message ?? "Banner inexistente"
      }`
    )
  }

  const { error: deleteError } = await supabase
    .from("banners")
    .delete()
    .eq("id", id)

  if (deleteError) {
    throw new Error(
      `No fue posible eliminar el banner: ${deleteError.message}`
    )
  }

  if (banner.imagen_path) {
    await supabase.storage
      .from("banners")
      .remove([banner.imagen_path])
  }

  revalidateBannerPages()
}