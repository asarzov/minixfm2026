"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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

export function MobileNavigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname.startsWith(href)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Abrir menú principal"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ☰
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-white/10 bg-neutral-950 text-white"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-white">
            MINIXFM
          </SheetTitle>

          <SheetDescription className="text-neutral-400">
            Radio Comunitaria Online
          </SheetDescription>
        </SheetHeader>

        <nav
          className="mt-8 flex flex-col gap-2"
          aria-label="Navegación móvil"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-orange-500 text-white"
                  : "text-neutral-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-sm leading-6 text-neutral-400">
            Cultura, comunicación y participación comunitaria.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}