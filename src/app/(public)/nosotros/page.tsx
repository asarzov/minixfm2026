import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NosotrosPage() {
  return (
    <main>
      <section className="border-b border-[#d5dddd] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f97316]">
            Nuestra organización
          </p>

          <h1 className="mt-5 max-w-6xl text-4xl font-bold leading-tight tracking-tight text-[#173f42] sm:text-5xl lg:text-6xl">
            Somos una radio comunitaria conectada con las personas y su
            territorio
          </h1>

          <p className="mt-8 max-w-5xl text-lg leading-8 text-[#34494b] sm:text-xl">
            MINIXFM es una plataforma de comunicación comunitaria que promueve
            la cultura, las artes, la educación, el patrimonio y la
            participación de las comunidades de la Región de Coquimbo.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
                Quiénes somos
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#173f42] sm:text-4xl">
                Fundación Radio Comunitaria Online MINIXFM
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-[#34494b] sm:text-lg">
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

      <section className="border-y border-[#d5dddd] bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Nuestro trabajo
            </p>

            <h2 className="mt-4 text-3xl font-bold text-[#173f42] sm:text-4xl">
              Comunicación, cultura y comunidad
            </h2>

            <p className="mt-4 text-lg leading-8 text-[#405557]">
              Desarrollamos distintas líneas de trabajo para fortalecer la
              participación y la comunicación comunitaria.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-[#d5dddd] bg-[#f8f9f9] text-[#173f42] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Radio comunitaria
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-base leading-7 text-[#34494b]">
                  Creamos y difundimos contenidos informativos, culturales,
                  educativos y comunitarios mediante nuestra señal online.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#d5dddd] bg-[#f8f9f9] text-[#173f42] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Talleres comunitarios
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-base leading-7 text-[#34494b]">
                  Desarrollamos espacios de formación y participación
                  vinculados con la cultura, las artes, las comunicaciones y el
                  patrimonio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#d5dddd] bg-[#f8f9f9] text-[#173f42] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Patrimonio y memoria
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-base leading-7 text-[#34494b]">
                  Registramos historias, testimonios y expresiones que forman
                  parte de la identidad y memoria de las comunidades.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#d5dddd] bg-[#f8f9f9] text-[#173f42] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Contenidos digitales
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-base leading-7 text-[#34494b]">
                  Utilizamos sitios web, redes sociales, audio y video para
                  ampliar el acceso a la comunicación comunitaria.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#d5dddd] bg-[#f8f9f9] text-[#173f42] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Participación
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-base leading-7 text-[#34494b]">
                  Promovemos espacios en que las personas y organizaciones
                  puedan expresarse, colaborar y compartir sus iniciativas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#d5dddd] bg-[#f8f9f9] text-[#173f42] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Vinculación territorial
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-base leading-7 text-[#34494b]">
                  Colaboramos con organizaciones culturales, sociales,
                  medioambientales, educativas, deportivas y comunitarias.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-[#f97316]/30 bg-[#f97316]/10 px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d85f0b]">
              Nuestro propósito
            </p>

            <p className="mt-5 max-w-5xl text-2xl font-bold leading-9 text-[#173f42] sm:text-3xl sm:leading-10">
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