"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
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
    href: "/nosotros",
    label: "Nosotros",
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
          className="border-[#b9c8c9] bg-transparent text-[#124d50] hover:bg-[#e5eeee] hover:text-[#124d50] md:hidden"
          aria-label="Abrir menú principal"
        >
          <span aria-hidden="true" className="text-xl leading-none">
            ☰
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-[#d5dddd] bg-[#f7f7f5] text-[#123f42]"
      >
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/minixfm-logo-color.png"
              alt=""
              width={52}
              height={52}
              className="h-12 w-12 object-contain"
            />

            <div>
              <SheetTitle className="text-[#123f42]">
                MINIXFM Fundación
              </SheetTitle>

              <SheetDescription className="text-neutral-500">
                Radio Comunitaria Online
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <nav
          className="mt-8 flex flex-col gap-2"
          aria-label="Navegación móvil"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                isActive(item.href)
                  ? "bg-[#17666a] text-white"
                  : "text-neutral-700 hover:bg-[#e3eeee] hover:text-[#124d50]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 border-t border-[#d5dddd] pt-6">
          <p className="text-sm leading-6 text-neutral-500">
            Cultura, comunicación y participación comunitaria.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}