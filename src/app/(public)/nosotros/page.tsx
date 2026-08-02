import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NosotrosPage() {
  return (
    <main>
      <section className="border-b border-white/10 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Nuestra organización
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Somos una radio comunitaria conectada con las personas y su territorio
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
            MINIXFM es una plataforma de comunicación comunitaria que promueve
            la cultura, las artes, la educación, el patrimonio y la participación
            de las comunidades de la Región de Coquimbo.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
                Quiénes somos
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Fundación Radio Comunitaria Online MINIXFM
              </h2>
            </div>

            <div className="space-y-5 text-base leading-7 text-neutral-300">
              <p>
                Desarrollamos comunicación local y comunitaria mediante radio
                online, plataformas digitales, contenidos audiovisuales y redes
                sociales.
              </p>

              <p>
                Buscamos fortalecer el sentido de comunidad, visibilizar las
                expresiones culturales del territorio y generar espacios de
                encuentro, aprendizaje y colaboración.
              </p>

              <p>
                MINIXFM forma parte del Registro de Puntos de Cultura
                Comunitaria y desarrolla iniciativas vinculadas con la cultura,
                las artes, el patrimonio y la participación comunitaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
              Nuestro trabajo
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Comunicación, cultura y comunidad
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-white/10 bg-neutral-900 text-white">
              <CardHeader>
                <CardTitle>Radio comunitaria</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-neutral-300">
                  Creamos y difundimos contenidos informativos, culturales,
                  educativos y comunitarios mediante nuestra señal online.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-neutral-900 text-white">
              <CardHeader>
                <CardTitle>Talleres comunitarios</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-neutral-300">
                  Desarrollamos espacios de formación y participación vinculados
                  con la cultura, las artes, las comunicaciones y el patrimonio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-neutral-900 text-white">
              <CardHeader>
                <CardTitle>Patrimonio y memoria</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-neutral-300">
                  Registramos historias, testimonios y expresiones que forman
                  parte de la identidad y memoria de las comunidades.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-neutral-900 text-white">
              <CardHeader>
                <CardTitle>Contenidos digitales</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-neutral-300">
                  Utilizamos sitios web, redes sociales, audio y video para
                  ampliar el acceso a la comunicación comunitaria.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-neutral-900 text-white">
              <CardHeader>
                <CardTitle>Participación</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-neutral-300">
                  Promovemos espacios en que las personas y organizaciones
                  puedan expresarse, colaborar y compartir sus iniciativas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-neutral-900 text-white">
              <CardHeader>
                <CardTitle>Vinculación territorial</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-6 text-neutral-300">
                  Colaboramos con organizaciones culturales, sociales,
                  medioambientales, educativas, deportivas y comunitarias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 px-6 py-10 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-orange-300">
              Nuestro propósito
            </p>

            <p className="mt-4 max-w-4xl text-2xl font-semibold leading-9">
              Contribuir al desarrollo de una comunicación cercana,
              participativa y comprometida con la identidad cultural y social
              de nuestras comunidades.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}