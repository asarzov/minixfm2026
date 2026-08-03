"use client"

import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"

type ColorStyle =
  | "institucional"
  | "oscuro"
  | "calido"
  | "claro"
  | "personalizado"

type BannerFormData = {
  id?: string
  subtitulo: string
  titulo: string
  descripcion: string
  imageUrl: string | null
  textoBoton: string
  enlaceBoton: string
  posicionImagen: string
  orden: number
  activo: boolean

  estiloColor: ColorStyle
  colorGradienteInicio: string
  colorGradienteFin: string
  opacidadGradiente: number
  colorTexto: string
  colorBoton: string
  colorTextoBoton: string
}

type BannerFormProps = {
  action: (formData: FormData) => Promise<void>
  initialData?: BannerFormData
  submitLabel: string
  requireImage?: boolean

  /*
   * Cuando es true:
   * - Oculta Orden.
   * - Oculta Estado.
   * - La imagen es opcional.
   * - Mantiene internamente orden 1 y estado activo.
   */
  esRespaldo?: boolean
}

type ColorPreset = {
  label: string
  description: string
  gradientStart: string
  gradientEnd: string
  opacity: number
  text: string
  button: string
  buttonText: string
}

const colorPresets: Record<
  Exclude<ColorStyle, "personalizado">,
  ColorPreset
> = {
  institucional: {
    label: "Institucional",
    description:
      "Verde petróleo, texto blanco y botón claro.",
    gradientStart: "#001f21",
    gradientEnd: "#003f42",
    opacity: 90,
    text: "#ffffff",
    button: "#ffffff",
    buttonText: "#173f42",
  },

  oscuro: {
    label: "Oscuro",
    description:
      "Negro y gris oscuro para fotografías luminosas.",
    gradientStart: "#000000",
    gradientEnd: "#111827",
    opacity: 88,
    text: "#ffffff",
    button: "#ffffff",
    buttonText: "#111827",
  },

  calido: {
    label: "Cálido",
    description:
      "Tonos naranjos y terracota.",
    gradientStart: "#7c2d12",
    gradientEnd: "#f97316",
    opacity: 82,
    text: "#ffffff",
    button: "#ffffff",
    buttonText: "#7c2d12",
  },

  claro: {
    label: "Claro",
    description:
      "Capa blanca, texto oscuro y botón institucional.",
    gradientStart: "#ffffff",
    gradientEnd: "#f4f4f2",
    opacity: 88,
    text: "#173f42",
    button: "#17666a",
    buttonText: "#ffffff",
  },
}

const defaultData: BannerFormData = {
  subtitulo: "MINIXFM Fundación",
  titulo: "",
  descripcion: "",
  imageUrl: null,
  textoBoton: "",
  enlaceBoton: "",
  posicionImagen: "center center",
  orden: 1,
  activo: true,

  estiloColor: "institucional",
  colorGradienteInicio: "#001f21",
  colorGradienteFin: "#003f42",
  opacidadGradiente: 90,
  colorTexto: "#ffffff",
  colorBoton: "#ffffff",
  colorTextoBoton: "#173f42",
}

function hexToRgba(
  hex: string,
  opacity: number
) {
  const fallbackHex = "#003f42"

  const validHex = /^#[0-9a-fA-F]{6}$/.test(hex)
    ? hex
    : fallbackHex

  const cleanHex = validHex.replace("#", "")

  const red = Number.parseInt(
    cleanHex.slice(0, 2),
    16
  )

  const green = Number.parseInt(
    cleanHex.slice(2, 4),
    16
  )

  const blue = Number.parseInt(
    cleanHex.slice(4, 6),
    16
  )

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

function SubmitButton({
  label,
}: {
  label: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#17666a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d5054] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Guardando..." : label}
    </button>
  )
}

export function BannerForm({
  action,
  initialData,
  submitLabel,
  requireImage = false,
  esRespaldo = false,
}: BannerFormProps) {
  const data = initialData ?? defaultData

  const [subtitulo, setSubtitulo] =
    useState(data.subtitulo)

  const [titulo, setTitulo] =
    useState(data.titulo)

  const [descripcion, setDescripcion] =
    useState(data.descripcion)

  const [textoBoton, setTextoBoton] =
    useState(data.textoBoton)

  const [enlaceBoton, setEnlaceBoton] =
    useState(data.enlaceBoton)

  const [posicionImagen, setPosicionImagen] =
    useState(data.posicionImagen)

  const [orden, setOrden] =
    useState(data.orden)

  const [activo, setActivo] =
    useState(data.activo)

  const [estiloColor, setEstiloColor] =
    useState<ColorStyle>(data.estiloColor)

  const [
    colorGradienteInicio,
    setColorGradienteInicio,
  ] = useState(data.colorGradienteInicio)

  const [
    colorGradienteFin,
    setColorGradienteFin,
  ] = useState(data.colorGradienteFin)

  const [
    opacidadGradiente,
    setOpacidadGradiente,
  ] = useState(data.opacidadGradiente)

  const [colorTexto, setColorTexto] =
    useState(data.colorTexto)

  const [colorBoton, setColorBoton] =
    useState(data.colorBoton)

  const [
    colorTextoBoton,
    setColorTextoBoton,
  ] = useState(data.colorTextoBoton)

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(data.imageUrl)

  const [
    imageDimensions,
    setImageDimensions,
  ] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  function applyPreset(style: ColorStyle) {
    setEstiloColor(style)

    if (style === "personalizado") {
      return
    }

    const preset = colorPresets[style]

    setColorGradienteInicio(
      preset.gradientStart
    )

    setColorGradienteFin(
      preset.gradientEnd
    )

    setOpacidadGradiente(
      preset.opacity
    )

    setColorTexto(preset.text)
    setColorBoton(preset.button)
    setColorTextoBoton(preset.buttonText)
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      setPreviewUrl(data.imageUrl)
      setImageDimensions(null)
      return
    }

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl)
    }

    const objectUrl =
      URL.createObjectURL(file)

    const image = new window.Image()

    image.onload = () => {
      setImageDimensions(
        `${image.naturalWidth} × ${image.naturalHeight} px`
      )
    }

    image.src = objectUrl
    setPreviewUrl(objectUrl)
  }

  const mainOpacity =
    opacidadGradiente / 100

  const secondaryOpacity =
    Math.max(
      opacidadGradiente - 35,
      10
    ) / 100

  const previewGradient = `linear-gradient(
    90deg,
    ${hexToRgba(
      colorGradienteInicio,
      mainOpacity
    )} 0%,
    ${hexToRgba(
      colorGradienteFin,
      secondaryOpacity
    )} 100%
  )`

  return (
    <form
      action={action}
      className="mt-8 space-y-8 rounded-2xl border border-[#d5dddd] bg-white p-6 shadow-sm sm:p-8"
    >
      {data.id ? (
        <input
          type="hidden"
          name="id"
          value={data.id}
        />
      ) : null}

      <input
        type="hidden"
        name="color_gradiente_inicio"
        value={colorGradienteInicio}
      />

      <input
        type="hidden"
        name="color_gradiente_fin"
        value={colorGradienteFin}
      />

      <input
        type="hidden"
        name="color_texto"
        value={colorTexto}
      />

      <input
        type="hidden"
        name="color_boton"
        value={colorBoton}
      />

      <input
        type="hidden"
        name="color_texto_boton"
        value={colorTextoBoton}
      />

      {esRespaldo ? (
        <>
          <input
            type="hidden"
            name="orden"
            value="1"
          />

          <input
            type="hidden"
            name="activo"
            value="on"
          />
        </>
      ) : null}

      {esRespaldo ? (
        <section className="rounded-2xl border border-[#b7d5d6] bg-[#eef7f7] p-5 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#17666a]">
            Banner institucional
          </p>

          <h2 className="mt-2 text-xl font-bold text-[#173f42]">
            Banner de respaldo
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#405557]">
            Este banner aparecerá únicamente cuando el carrusel
            principal esté activado y no existan otros banners
            normales activos. No necesita orden ni estado individual.
          </p>
        </section>
      ) : null}

      <section>
        <h2 className="text-xl font-bold text-[#173f42]">
          Vista previa
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#526466]">
          Esta vista representa el recorte, el gradiente y
          los colores que aparecerán en la portada.
        </p>

        <div
          className="relative mt-5 min-h-[320px] overflow-hidden rounded-2xl bg-[#003f42] bg-cover"
          style={{
            backgroundImage: previewUrl
              ? `url("${previewUrl}")`
              : undefined,

            backgroundPosition:
              posicionImagen,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                previewGradient,
            }}
          />

          <div className="relative flex min-h-[320px] items-center px-8 py-12 sm:px-10">
            <div
              className="max-w-2xl"
              style={{
                color: colorTexto,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.22em]"
                style={{
                  color: colorTexto,
                  opacity: 0.9,
                }}
              >
                {subtitulo ||
                  "Subtítulo del banner"}
              </p>

              <h3 className="mt-4 line-clamp-2 text-3xl font-bold leading-tight">
                {titulo ||
                  "Título del banner"}
              </h3>

              <p
                className="mt-4 line-clamp-3 leading-7"
                style={{
                  color: colorTexto,
                  opacity: 0.9,
                }}
              >
                {descripcion ||
                  "La descripción aparecerá en este espacio sobre la imagen."}
              </p>

              {textoBoton ? (
                <span
                  className="mt-6 inline-flex min-h-11 items-center rounded-xl px-5 py-2 text-sm font-bold shadow-lg"
                  style={{
                    backgroundColor:
                      colorBoton,

                    color:
                      colorTextoBoton,
                  }}
                >
                  {textoBoton}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#d5dddd] bg-[#f7f9f9] p-5 sm:p-6">
        <h2 className="text-xl font-bold text-[#173f42]">
          Colores del banner
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#526466]">
          Seleccione un estilo predeterminado o configure
          manualmente los colores.
        </p>

        <div className="mt-5">
          <label
            htmlFor="estilo_color"
            className="block text-sm font-bold text-[#173f42]"
          >
            Estilo visual
          </label>

          <select
            id="estilo_color"
            name="estilo_color"
            value={estiloColor}
            onChange={(event) =>
              applyPreset(
                event.target
                  .value as ColorStyle
              )
            }
            className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] sm:max-w-md"
          >
            <option value="institucional">
              Institucional
            </option>

            <option value="oscuro">
              Oscuro
            </option>

            <option value="calido">
              Cálido
            </option>

            <option value="claro">
              Claro
            </option>

            <option value="personalizado">
              Personalizado
            </option>
          </select>

          <p className="mt-2 text-sm text-[#526466]">
            {estiloColor ===
            "personalizado"
              ? "Seleccione manualmente todos los colores."
              : colorPresets[
                  estiloColor
                ].description}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="opacidad_gradiente"
              className="text-sm font-bold text-[#173f42]"
            >
              Intensidad del gradiente
            </label>

            <span className="rounded-full bg-[#17666a] px-3 py-1 text-xs font-bold text-white">
              {opacidadGradiente}%
            </span>
          </div>

          <input
            id="opacidad_gradiente"
            name="opacidad_gradiente"
            type="range"
            min={20}
            max={100}
            step={1}
            value={opacidadGradiente}
            onChange={(event) =>
              setOpacidadGradiente(
                Number(
                  event.target.value
                )
              )
            }
            className="mt-4 w-full accent-[#17666a]"
          />

          <div className="mt-1 flex justify-between text-xs text-[#526466]">
            <span>Suave</span>
            <span>Intenso</span>
          </div>
        </div>

        {estiloColor ===
        "personalizado" ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <ColorInput
              label="Inicio del gradiente"
              value={
                colorGradienteInicio
              }
              onChange={
                setColorGradienteInicio
              }
            />

            <ColorInput
              label="Final del gradiente"
              value={colorGradienteFin}
              onChange={
                setColorGradienteFin
              }
            />

            <ColorInput
              label="Color del texto"
              value={colorTexto}
              onChange={setColorTexto}
            />

            <ColorInput
              label="Color del botón"
              value={colorBoton}
              onChange={setColorBoton}
            />

            <ColorInput
              label="Texto del botón"
              value={colorTextoBoton}
              onChange={
                setColorTextoBoton
              }
            />
          </div>
        ) : null}
      </section>

      <div>
        <label
          htmlFor="imagen"
          className="block text-sm font-bold text-[#173f42]"
        >
          {esRespaldo
            ? "Imagen del banner (opcional)"
            : "Imagen del banner"}
        </label>

        <input
          id="imagen"
          name="imagen"
          type="file"
          required={
            requireImage &&
            !esRespaldo
          }
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="mt-2 block w-full rounded-xl border border-dashed border-[#9eafb0] bg-[#f7f9f9] px-4 py-5 text-sm text-[#34494b] file:mr-4 file:rounded-lg file:border-0 file:bg-[#17666a] file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-[#0d5054]"
        />

        <div className="mt-3 rounded-xl bg-[#eef2f2] p-4 text-sm leading-6 text-[#405557]">
          {esRespaldo ? (
            <p className="mb-2">
              <strong>
                La imagen es opcional:
              </strong>{" "}
              si no selecciona una imagen, el banner
              utilizará solamente el gradiente de color.
            </p>
          ) : null}

          <p>
            <strong>
              Tamaño recomendado:
            </strong>{" "}
            1600 × 600 px.
          </p>

          <p>
            <strong>
              Tamaño mínimo recomendado:
            </strong>{" "}
            1200 × 450 px.
          </p>

          <p>
            <strong>Formatos:</strong>{" "}
            JPG, PNG o WEBP. Máximo 5 MB.
          </p>

          {imageDimensions ? (
            <p className="mt-2 font-bold text-[#17666a]">
              Imagen seleccionada:{" "}
              {imageDimensions}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="posicion_imagen"
          className="block text-sm font-bold text-[#173f42]"
        >
          Punto de enfoque de la imagen
        </label>

        <select
          id="posicion_imagen"
          name="posicion_imagen"
          value={posicionImagen}
          onChange={(event) =>
            setPosicionImagen(
              event.target.value
            )
          }
          className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] bg-white px-4 text-[#173f42] sm:max-w-md"
        >
          <option value="center center">
            Centro
          </option>

          <option value="center top">
            Parte superior
          </option>

          <option value="center bottom">
            Parte inferior
          </option>

          <option value="left center">
            Lado izquierdo
          </option>

          <option value="right center">
            Lado derecho
          </option>
        </select>
      </div>

      <div>
        <label
          htmlFor="subtitulo"
          className="block text-sm font-bold text-[#173f42]"
        >
          Subtítulo superior
        </label>

        <input
          id="subtitulo"
          name="subtitulo"
          type="text"
          maxLength={80}
          value={subtitulo}
          onChange={(event) =>
            setSubtitulo(
              event.target.value
            )
          }
          className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] px-4 text-[#173f42]"
        />
      </div>

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
          maxLength={120}
          value={titulo}
          onChange={(event) =>
            setTitulo(
              event.target.value
            )
          }
          placeholder="Título principal del banner"
          className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] px-4 text-[#173f42] placeholder:text-neutral-500"
        />
      </div>

      <div>
        <label
          htmlFor="descripcion"
          className="block text-sm font-bold text-[#173f42]"
        >
          Descripción
        </label>

        <textarea
          id="descripcion"
          name="descripcion"
          rows={4}
          maxLength={240}
          value={descripcion}
          onChange={(event) =>
            setDescripcion(
              event.target.value
            )
          }
          placeholder="Descripción breve del contenido destacado"
          className="mt-2 w-full rounded-xl border border-[#bdc9ca] px-4 py-3 leading-7 text-[#173f42] placeholder:text-neutral-500"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="texto_boton"
            className="block text-sm font-bold text-[#173f42]"
          >
            Texto del botón
          </label>

          <input
            id="texto_boton"
            name="texto_boton"
            type="text"
            maxLength={40}
            required={Boolean(
              enlaceBoton
            )}
            value={textoBoton}
            onChange={(event) =>
              setTextoBoton(
                event.target.value
              )
            }
            placeholder="Ejemplo: Conocer MINIXFM"
            className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] px-4 text-[#173f42]"
          />
        </div>

        <div>
          <label
            htmlFor="enlace_boton"
            className="block text-sm font-bold text-[#173f42]"
          >
            Enlace del botón
          </label>

          <input
            id="enlace_boton"
            name="enlace_boton"
            type="text"
            required={Boolean(
              textoBoton
            )}
            value={enlaceBoton}
            onChange={(event) =>
              setEnlaceBoton(
                event.target.value
              )
            }
            placeholder="/nosotros o https://..."
            className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] px-4 text-[#173f42]"
          />
        </div>

        <p className="text-sm leading-6 text-[#526466] sm:col-span-2">
          El botón es opcional. Para mostrarlo debe
          completar tanto el texto como el enlace. Puede
          usar una ruta interna o una URL externa completa.
        </p>
      </div>

      {!esRespaldo ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="orden"
              className="block text-sm font-bold text-[#173f42]"
            >
              Orden de aparición
            </label>

            <input
              id="orden"
              name="orden"
              type="number"
              min={1}
              step={1}
              required
              value={orden}
              onChange={(event) =>
                setOrden(
                  Number(
                    event.target.value
                  )
                )
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-[#bdc9ca] px-4 text-[#173f42]"
            />
          </div>

          <div>
            <p className="block text-sm font-bold text-[#173f42]">
              Estado
            </p>

            <label className="mt-3 flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-[#bdc9ca] px-4">
              <input
                name="activo"
                type="checkbox"
                checked={activo}
                onChange={(event) =>
                  setActivo(
                    event.target.checked
                  )
                }
                className="h-5 w-5 accent-[#17666a]"
              />

              <span className="font-semibold text-[#34494b]">
                Banner activo
              </span>
            </label>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#d5dddd] bg-[#f7f9f9] p-4 text-sm leading-6 text-[#405557]">
          El banner de respaldo no utiliza un orden de
          aparición ni un estado individual. Se mostrará
          automáticamente cuando el carrusel esté habilitado
          y no existan banners normales activos.
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-[#d5dddd] pt-6 sm:flex-row sm:justify-end">
        <Link
          href="/admin/banners"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bdc9ca] px-6 py-3 text-sm font-bold text-[#34494b] transition hover:bg-[#eef1f1]"
        >
          Cancelar
        </Link>

        <SubmitButton
          label={submitLabel}
        />
      </div>
    </form>
  )
}

type ColorInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorInput({
  label,
  value,
  onChange,
}: ColorInputProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-[#173f42]">
        {label}
      </label>

      <div className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-[#bdc9ca] bg-white px-3">
        <input
          type="color"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          className="h-8 w-10 cursor-pointer border-0 bg-transparent p-0"
        />

        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          maxLength={7}
          className="min-w-0 flex-1 bg-transparent font-mono text-sm uppercase text-[#34494b] outline-none"
        />
      </div>
    </div>
  )
}