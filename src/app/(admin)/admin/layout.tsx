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
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
              Administración
            </p>

            <h1 className="text-xl font-bold text-neutral-950">
              MINIXFM
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
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
        <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="mb-4 border-b border-neutral-200 pb-3">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
              Menú principal
            </p>
          </div>

          <nav
            aria-label="Navegación del panel administrativo"
            className="space-y-2 text-sm"
          >
            <Link
              href="/admin"
              className="block rounded-md px-3 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
            >
              Resumen
            </Link>

            <Link
              href="/admin/noticias"
              className="block rounded-md px-3 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
            >
              Noticias
            </Link>

            <Link
              href="/admin/banners"
              className="block rounded-md px-3 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
            >
              Banners
            </Link>

            <Link
              href="/admin/programacion"
              className="block rounded-md px-3 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
            >
              Programación
            </Link>

            <Link
              href="/admin/talleres"
              className="block rounded-md px-3 py-2 font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
            >
              Talleres
            </Link>
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}