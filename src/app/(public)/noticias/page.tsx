import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Noticias",
  description:
    "Noticias, actividades y proyectos de MINIXFM Fundación.",
}

export default function NoticiasPage() {
  return (
    <main>
      <section className="border-b border-[#d5dddd] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Actualidad MINIXFM
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173f42] sm:text-5xl">
            Noticias
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#34494b]">
            Conozca las actividades, proyectos, encuentros y acontecimientos
            vinculados con MINIXFM Fundación y nuestras comunidades.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#d5dddd] bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#173f42]">
              Próximamente
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#405557]">
              Estamos preparando las primeras noticias y contenidos de
              MINIXFM. Muy pronto podrá encontrarlos en esta sección.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}