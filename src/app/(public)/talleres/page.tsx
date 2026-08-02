import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Talleres",
  description:
    "Talleres culturales y comunitarios organizados por MINIXFM Fundación.",
}

export default function TalleresPage() {
  return (
    <main>
      <section className="border-b border-[#d5dddd] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Punto de Cultura Comunitaria
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173f42] sm:text-5xl">
            Talleres comunitarios
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#34494b]">
            Descubra nuestros espacios de formación, encuentro y participación
            vinculados con la cultura, las artes, las comunicaciones y el
            patrimonio.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#d5dddd] bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#173f42]">
              Nuevos talleres próximamente
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#405557]">
              En esta sección publicaremos las fechas, horarios, lugares,
              requisitos y formularios de inscripción de nuestras actividades.
            </p>

            <Link
              href="/contacto"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#17666a] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0d5054]"
            >
              Consultar por talleres
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}