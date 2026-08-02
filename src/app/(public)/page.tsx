import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
          Radio comunitaria online de Diaguitas
        </p>

        <h1 className="text-5xl font-bold tracking-tight">
          MINIX FM
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-neutral-300">
          Estamos construyendo la nueva plataforma digital de MINIXFM.
        </p>

        <Card className="mt-10 max-w-xl">
          <CardHeader>
            <CardTitle>Primera versión en desarrollo</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-5 text-muted-foreground">
              Próximamente encontrará noticias, programación, talleres y la
              señal de radio en vivo.
            </p>

            <Button>Escuchar MINIXFM</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}