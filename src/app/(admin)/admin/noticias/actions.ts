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

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
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

async function createUniqueSlug(
  supabase: SupabaseServerClient,
  title: string,
  currentId?: string
) {
  const baseSlug = createSlug(title) || crypto.randomUUID()

  let slug = baseSlug
  let suffix = 2

  while (true) {
    const query = currentId
      ? supabase
          .from("noticias")
          .select("id")
          .eq("slug", slug)
          .neq("id", currentId)
          .maybeSingle()
      : supabase
          .from("noticias")
          .select("id")
          .eq("slug", slug)
          .maybeSingle()

    const { data, error } = await query

    if (error) {
      throw new Error(
        `No fue posible verificar el enlace de la noticia: ${error.message}`
      )
    }

    if (!data) {
      return slug
    }

    slug = `${baseSlug}-${suffix}`
    suffix += 1
  }
}

async function uploadNewsImage(
  supabase: SupabaseServerClient,
  image: File
) {
  if (!allowedImageTypes[image.type]) {
    throw new Error(
      "La imagen debe estar en formato JPG, PNG o WEBP."
    )
  }

  if (image.size > MAX_IMAGE_SIZE) {
    throw new Error("La imagen no puede superar los 5 MB.")
  }

  const extension = allowedImageTypes[image.type]
  const path = `portadas/${crypto.randomUUID()}.${extension}`
  const imageBuffer = new Uint8Array(await image.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from("noticias")
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
    .from("noticias")
    .getPublicUrl(path)

  return {
    path,
    publicUrl: data.publicUrl,
  }
}

function revalidateNewsPages(slug?: string, previousSlug?: string) {
  revalidatePath("/")
  revalidatePath("/noticias")
  revalidatePath("/admin/noticias")

  if (slug) {
    revalidatePath(`/noticias/${slug}`)
  }

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/noticias/${previousSlug}`)
  }
}

export async function crearNoticia(formData: FormData) {
  const supabase = await getAuthenticatedClient()

  const titulo = String(formData.get("titulo") ?? "").trim()
  const bajada = String(formData.get("bajada") ?? "").trim()
  const contenido = String(formData.get("contenido") ?? "").trim()
  const categoria =
    String(formData.get("categoria") ?? "").trim() || "General"
  const autor = String(formData.get("autor") ?? "").trim()
  const estado = String(formData.get("estado") ?? "borrador")

  if (!titulo) {
    throw new Error("Debe ingresar el título de la noticia.")
  }

  if (!bajada) {
    throw new Error("Debe ingresar la bajada de la noticia.")
  }

  if (!contenido) {
    throw new Error("Debe ingresar el contenido de la noticia.")
  }

  if (!autor) {
    throw new Error("Debe ingresar el nombre del autor.")
  }

  if (!["borrador", "publicada", "archivada"].includes(estado)) {
    throw new Error("El estado seleccionado no es válido.")
  }

  const slug = await createUniqueSlug(supabase, titulo)

  let imagenPrincipal: string | null = null
  let imagenPath: string | null = null

  const imagen = formData.get("imagen")

  if (imagen instanceof File && imagen.size > 0) {
    const uploadedImage = await uploadNewsImage(supabase, imagen)

    imagenPrincipal = uploadedImage.publicUrl
    imagenPath = uploadedImage.path
  }

  const fechaPublicacion =
    estado === "publicada" ? new Date().toISOString() : null

  const { error: insertError } = await supabase.from("noticias").insert({
    titulo,
    slug,
    bajada,
    contenido,
    categoria,
    imagen_principal: imagenPrincipal,
    imagen_path: imagenPath,
    autor,
    estado,
    fecha_publicacion: fechaPublicacion,
  })

  if (insertError) {
    if (imagenPath) {
      await supabase.storage.from("noticias").remove([imagenPath])
    }

    throw new Error(
      `No fue posible guardar la noticia: ${insertError.message}`
    )
  }

  revalidateNewsPages(slug)

  redirect("/admin/noticias")
}

export async function actualizarNoticia(formData: FormData) {
  const supabase = await getAuthenticatedClient()

  const id = String(formData.get("id") ?? "").trim()
  const titulo = String(formData.get("titulo") ?? "").trim()
  const bajada = String(formData.get("bajada") ?? "").trim()
  const contenido = String(formData.get("contenido") ?? "").trim()
  const categoria =
    String(formData.get("categoria") ?? "").trim() || "General"
  const autor = String(formData.get("autor") ?? "").trim()
  const estado = String(formData.get("estado") ?? "borrador")

  if (!id) {
    throw new Error("No se encontró el identificador de la noticia.")
  }

  if (!titulo || !bajada || !contenido || !autor) {
    throw new Error("Debe completar todos los campos obligatorios.")
  }

  if (!["borrador", "publicada", "archivada"].includes(estado)) {
    throw new Error("El estado seleccionado no es válido.")
  }

  const { data: currentNews, error: fetchError } = await supabase
    .from("noticias")
    .select(
      "id, slug, imagen_principal, imagen_path, fecha_publicacion"
    )
    .eq("id", id)
    .single()

  if (fetchError || !currentNews) {
    throw new Error(
      `No fue posible encontrar la noticia: ${
        fetchError?.message ?? "Noticia inexistente"
      }`
    )
  }

  const slug = await createUniqueSlug(supabase, titulo, id)

  let imagenPrincipal = currentNews.imagen_principal
  let imagenPath = currentNews.imagen_path
  let newImagePath: string | null = null

  const imagen = formData.get("imagen")

  if (imagen instanceof File && imagen.size > 0) {
    const uploadedImage = await uploadNewsImage(supabase, imagen)

    imagenPrincipal = uploadedImage.publicUrl
    imagenPath = uploadedImage.path
    newImagePath = uploadedImage.path
  }

  const fechaPublicacion =
    estado === "publicada"
      ? currentNews.fecha_publicacion ?? new Date().toISOString()
      : null

  const { error: updateError } = await supabase
    .from("noticias")
    .update({
      titulo,
      slug,
      bajada,
      contenido,
      categoria,
      imagen_principal: imagenPrincipal,
      imagen_path: imagenPath,
      autor,
      estado,
      fecha_publicacion: fechaPublicacion,
    })
    .eq("id", id)

  if (updateError) {
    if (newImagePath) {
      await supabase.storage.from("noticias").remove([newImagePath])
    }

    throw new Error(
      `No fue posible actualizar la noticia: ${updateError.message}`
    )
  }

  if (
    newImagePath &&
    currentNews.imagen_path &&
    currentNews.imagen_path !== newImagePath
  ) {
    await supabase.storage
      .from("noticias")
      .remove([currentNews.imagen_path])
  }

  revalidateNewsPages(slug, currentNews.slug)

  redirect("/admin/noticias")
}

export async function eliminarNoticia(formData: FormData) {
  const supabase = await getAuthenticatedClient()

  const id = String(formData.get("id") ?? "").trim()

  if (!id) {
    throw new Error("No se encontró el identificador de la noticia.")
  }

  const { data: noticia, error: fetchError } = await supabase
    .from("noticias")
    .select("slug, imagen_path")
    .eq("id", id)
    .single()

  if (fetchError || !noticia) {
    throw new Error(
      `No fue posible encontrar la noticia: ${
        fetchError?.message ?? "Noticia inexistente"
      }`
    )
  }

  const { error: deleteError } = await supabase
    .from("noticias")
    .delete()
    .eq("id", id)

  if (deleteError) {
    throw new Error(
      `No fue posible eliminar la noticia: ${deleteError.message}`
    )
  }

  if (noticia.imagen_path) {
    await supabase.storage
      .from("noticias")
      .remove([noticia.imagen_path])
  }

  revalidateNewsPages(undefined, noticia.slug)
}