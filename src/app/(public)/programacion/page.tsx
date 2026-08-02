import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programación",
  description:
    "Programas y horarios de la señal online de MINIXFM Fundación.",
}

export default function ProgramacionPage() {
  return (
    <main>
      <section className="border-b border-[#d5dddd] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
            Señal comunitaria
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173f42] sm:text-5xl">
            Programación radial
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#34494b]">
            Consulte los programas, horarios y contenidos que forman parte de
            nuestra señal de radio comunitaria online.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#d5dddd] bg-white px-6 py-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-[#173f42]">
              Programación en preparación
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#405557]">
              Próximamente publicaremos los días, horarios, descripciones y
              responsables de cada programa de MINIXFM.
            </p>

            <div className="mx-auto mt-8 max-w-xl rounded-xl bg-[#e8eeee] px-5 py-4">
              <p className="font-semibold text-[#17666a]">
                La señal en vivo estará disponible desde el reproductor
                persistente ubicado en la parte inferior.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}