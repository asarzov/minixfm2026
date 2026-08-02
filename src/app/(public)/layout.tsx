import Image from "next/image"
import Link from "next/link"

import { AudioPlayer } from "@/components/player/audio-player"
import { MobileNavigation } from "@/components/public/mobile-navigation"

const navigationItems = [
  { href: "/", label: "Inicio" },
  { href: "/noticias", label: "Noticias" },
  { href: "/programacion", label: "Programación" },
  { href: "/talleres", label: "Talleres" },
  { href: "/nosotros", label: "Nosotros" },
]

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-[#f5f6f7] pb-24 text-[#173f42]">
      <header className="sticky top-0 z-40 border-b border-[#d5dddd] bg-[#f8f9fa]/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Ir al inicio de MINIXFM Fundación"
          >
            <Image
              src="/logos/minixfm-logo-color.png"
              alt="Logotipo de MINIXFM Fundación"
              width={52}
              height={52}
              priority
              className="h-11 w-11 object-contain"
            />

            <span className="hidden text-lg font-bold tracking-tight text-[#275e62] sm:block">
              MINIXFM Fundación
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <nav
              className="flex items-center gap-7 text-sm font-semibold"
              aria-label="Navegación principal"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-neutral-700 transition-colors hover:text-[#17666a]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/contacto"
              className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#17666a] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0d5054]"
            >
              Contacto
            </Link>
          </div>

          <MobileNavigation />
        </div>
      </header>

      {children}

      <footer className="border-t border-[#d5dddd] bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/minixfm-logo-color.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />

            <div>
              <p className="font-bold text-[#275e62]">
                MINIXFM Fundación
              </p>

              <p className="text-sm text-neutral-500">
                Radio Comunitaria Online
              </p>
            </div>
          </div>

          <div className="text-sm text-neutral-500 sm:text-right">
            <p>Cultura, comunicación y comunidad</p>
            <p className="mt-1">
              Región de Coquimbo, Chile
            </p>
          </div>
        </div>
      </footer>

      <AudioPlayer />
    </div>
  )
}