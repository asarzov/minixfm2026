import type { Metadata } from "next"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "MINIXFM, radio comunitaria online comprometida con la cultura, la comunicación y la participación comunitaria.",
}

const featuredSections = [
  {
    title: "Noticias",
    description:
      "Conozca las actividades, proyectos y acontecimientos de nuestra comunidad.",
    href: "/noticias",
    linkText: "Ver noticias",
  },
  {
    title: "Programación",
    description:
      "Revise los programas, horarios y espacios que forman parte de nuestra señal.",
    href: "/programacion",
    linkText: "Ver programación",
  },
  {
    title: "Talleres",
    description:
      "Descubra oportunidades de formación, encuentro y participación comunitaria.",
    href: "/talleres",
    linkText: "Ver talleres",
  },
]

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_35%)]"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Radio comunitaria online
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              La voz de nuestra comunidad, conectada con el territorio
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              MINIXFM es un espacio de comunicación, cultura y participación
              comunitaria que difunde historias, iniciativas y expresiones de
              las comunidades de la Región de Coquimbo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/programacion"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Ver programación
              </Link>

              <Link
                href="/nosotros"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Conocer MINIXFM
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] bg-orange-500/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 p-7 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                    Señal online
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    MINIXFM en vivo
                  </h2>
                </div>

                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg">
                  ▶
                </span>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-neutral-600" />

                  <div>
                    <p className="font-semibold">
                      Reproductor persistente
                    </p>

                    <p className="mt-1 text-sm text-neutral-400">
                      La señal estará disponible desde la barra inferior.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-neutral-400">
                Puede navegar por toda la plataforma sin perder el acceso al
                reproductor de la radio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Explore nuestra plataforma
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Información, contenidos y participación
            </h2>

            <p className="mt-4 text-lg leading-8 text-neutral-300">
              Acceda a las principales áreas de MINIXFM y conozca lo que está
              ocurriendo en nuestra comunidad.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredSections.map((section) => (
              <Card
                key={section.href}
                className="group border-white/10 bg-neutral-900 text-white transition-transform duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {section.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="min-h-20 text-sm leading-6 text-neutral-300">
                    {section.description}
                  </p>

                  <Link
                    href={section.href}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-orange-400 transition-colors group-hover:text-orange-300"
                  >
                    {section.linkText}
                    <span aria-hidden="true" className="ml-2">
                      →
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Comunicación comunitaria
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Un espacio para escuchar, compartir y encontrarnos
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-neutral-300">
              Promovemos contenidos culturales, educativos, patrimoniales y
              comunitarios. También generamos espacios de formación y
              colaboración junto a personas, organizaciones e instituciones del
              territorio.
            </p>

            <Link
              href="/nosotros"
              className="mt-7 inline-flex items-center text-sm font-semibold text-orange-400 hover:text-orange-300"
            >
              Conozca nuestra organización
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/10 px-6 py-12 sm:px-10 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                Conectemos
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                ¿Tiene una actividad, historia o iniciativa para compartir?
              </h2>

              <p className="mt-4 leading-7 text-neutral-200">
                Comuníquese con MINIXFM y conversemos sobre oportunidades de
                difusión, colaboración y participación comunitaria.
              </p>
            </div>

            <Link
              href="/contacto"
              className="mt-8 inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 lg:mt-0"
            >
              Ir a Contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}