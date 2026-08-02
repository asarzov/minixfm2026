import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-neutral-950">
        Panel administrativo
      </h2>

      <p className="mt-2 text-neutral-600">
        Desde aquí se gestionarán los contenidos de MINIXFM.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Noticias</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Crear, editar y publicar noticias.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Programación</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Administrar programas y horarios.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Talleres</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              Publicar talleres y actividades comunitarias.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}