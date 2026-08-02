import Link from "next/link"

import { AudioPlayer } from "@/components/player/audio-player"
import { MobileNavigation } from "@/components/public/mobile-navigation"

const navigationItems = [
  {
    href: "/",
    label: "Inicio",
  },
  {
    href: "/nosotros",
    label: "Nosotros",
  },
  {
    href: "/noticias",
    label: "Noticias",
  },
  {
    href: "/programacion",
    label: "Programación",
  },
  {
    href: "/talleres",
    label: "Talleres",
  },
  {
    href: "/contacto",
    label: "Contacto",
  },
]

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-neutral-950 pb-24 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-bold tracking-tight text-white"
            aria-label="Ir al inicio de MINIXFM"
          >
            <span className="text-xl">
              MINIX
            </span>

            <span className="text-xl text-orange-500">
              FM
            </span>
          </Link>

          <nav
            className="hidden items-center gap-6 text-sm text-neutral-300 md:flex"
            aria-label="Navegación principal"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-orange-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <MobileNavigation />
        </div>
      </header>

      {children}

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            Radio Comunitaria Online MINIXFM
          </p>

          <p>
            Cultura, comunicación y comunidad
          </p>
        </div>
      </footer>

      <AudioPlayer />
    </div>
  )
}