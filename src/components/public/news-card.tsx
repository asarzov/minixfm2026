import Image from "next/image"
import Link from "next/link"

type NewsCardProps = {
  title: string
  excerpt: string
  category: string
  slug: string
  imageUrl: string | null
  publishedAt: string | null
}

function getDateParts(value: string | null) {
  if (!value) {
    return {
      day: "--",
      month: "---",
    }
  }

  const date = new Date(value)

  return {
    day: new Intl.DateTimeFormat("es-CL", {
      day: "2-digit",
      timeZone: "America/Santiago",
    }).format(date),

    month: new Intl.DateTimeFormat("es-CL", {
      month: "short",
      timeZone: "America/Santiago",
    })
      .format(date)
      .replace(".", "")
      .toUpperCase(),
  }
}

export function NewsCard({
  title,
  excerpt,
  category,
  slug,
  imageUrl,
  publishedAt,
}: NewsCardProps) {
  const date = getDateParts(publishedAt)

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#d5dddd] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#003f42] via-[#17666a] to-[#41a48f]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Imagen de la noticia: ${title}`}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Image
              src="/logos/minixfm-logo-white.png"
              alt=""
              width={180}
              height={180}
              className="h-36 w-36 object-contain opacity-90"
            />
          </div>
        )}

        <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#173f42] shadow">
          {category}
        </span>

        <div className="absolute right-5 top-5 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#f97316] text-white shadow-lg">
          <span className="text-xl font-bold leading-none">
            {date.day}
          </span>

          <span className="mt-1 text-xs font-bold">
            {date.month}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold leading-tight text-[#173f42]">
          {title}
        </h3>

        <p className="mt-4 line-clamp-3 text-base leading-7 text-[#34494b]">
          {excerpt}
        </p>

        <Link
          href={`/noticias/${slug}`}
          className="mt-6 inline-flex font-bold text-[#17666a] transition group-hover:text-[#f97316]"
        >
          Leer noticia
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
      </div>
    </article>
  )
}