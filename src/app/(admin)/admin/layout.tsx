import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { logout } from "./actions"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()

  if (!data?.claims) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
              Administración
            </p>

            <h1 className="text-xl font-bold text-neutral-950">
              MINIXFM
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-neutral-950"
            >
              Ver sitio público
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border bg-white p-4">
          <nav className="space-y-2 text-sm">
            <Link
              href="/admin"
              className="block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100"
            >
              Resumen
            </Link>

            <Link
              href="/admin/noticias"
              className="block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100"
            >
              Noticias
            </Link>

            <Link
              href="/admin/programacion"
              className="block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100"
            >
              Programación
            </Link>

            <Link
              href="/admin/talleres"
              className="block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100"
            >
              Talleres
            </Link>
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  )
}