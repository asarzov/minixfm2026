import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { HomeBannerCarousel } from "@/components/public/home-banner-carousel"

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "MINIXFM Fundación, radio comunitaria online de la Región de Coquimbo.",
}

const newsItems = [
  {
    title: "MINIXFM fortalece su plataforma de comunicación comunitaria",
    excerpt:
      "La Fundación avanza en la creación de nuevos espacios digitales para acercar sus contenidos a toda la comunidad.",
    day: "02",
    month: "AGO",
    category: "Institucional",
    href: "/noticias",
    background:
      "bg-gradient-to-br from-[#003f42] via-[#17666a] to-[#41a48f]",
  },
  {
    title: "Nuevos talleres culturales y comunitarios",
    excerpt:
      "Próximamente se publicarán actividades de formación, creación y participación abiertas a la comunidad.",
    day: "28",
    month: "JUL",
    category: "Talleres",
    href: "/talleres",
    background:
      "bg-gradient-to-br from-[#f97316] via-[#e55d17] to-[#7d4731]",
  },
  {
    title: "Programación y contenidos desde el territorio",
    excerpt:
      "La señal de MINIXFM reunirá música, entrevistas y contenidos vinculados con la identidad regional.",
    day: "21",
    month: "JUL",
    category: "Programación",
    href: "/programacion",
    background:
      "bg-gradient-to-br from-[#7657e8] via-[#347fc4] to-[#00aaa9]",
  },
]

export default function HomePage() {
  return (
    <main>
      <section className="px-4 py-5 sm:px-6 sm:py-7">
        <div className="mx-auto max-w-7xl">
          <HomeBannerCarousel />
        </div>
      </section>

      <section className="px-4 pb-20 pt-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
                Actualidad MINIXFM
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#173f42] sm:text-4xl">
                Noticias y actividades
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#34494b]">
                Conozca nuestros proyectos, actividades y contenidos más
                recientes.
              </p>
            </div>

            <Link
              href="/noticias"
              className="font-bold text-[#17666a] transition hover:text-[#f97316]"
            >
              Ver todas las noticias →
            </Link>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((news) => (
              <article
                key={news.title}
                className="group overflow-hidden rounded-2xl border border-[#d5dddd] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative flex h-64 items-center justify-center overflow-hidden ${news.background}`}
                >
                  <Image
                    src="/logos/minixfm-logo-white.png"
                    alt=""
                    width={190}
                    height={190}
                    className="h-40 w-40 object-contain opacity-90 transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#173f42] shadow">
                    {news.category}
                  </span>

                  <div className="absolute right-5 top-5 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#f97316] text-white shadow-lg">
                    <span className="text-xl font-bold leading-none">
                      {news.day}
                    </span>

                    <span className="mt-1 text-xs font-bold">
                      {news.month}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold leading-tight text-[#173f42]">
                    {news.title}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-[#34494b]">
                    {news.excerpt}
                  </p>

                  <Link
                    href={news.href}
                    className="mt-6 inline-flex font-bold text-[#17666a] transition group-hover:text-[#f97316]"
                  >
                    Leer más
                    <span aria-hidden="true" className="ml-2">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d5dddd] bg-white px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Punto de Cultura Comunitaria
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#173f42] sm:text-4xl">
              Comunicación al servicio de las personas y su territorio
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-[#34494b]">
              MINIXFM genera espacios de información, cultura, educación,
              patrimonio y participación, promoviendo el trabajo colaborativo
              junto a las comunidades de la Región de Coquimbo.
            </p>

            <Link
              href="/nosotros"
              className="mt-7 inline-flex font-bold text-[#17666a] hover:text-[#f97316]"
            >
              Conozca nuestra organización →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}