"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

type Slide = {
  id: number
  eyebrow: string
  title: string
  description: string
  href: string
  action: string
  imageUrl: string | null
  imageAlt: string
  imagePosition: string
  fallbackBackground: string
}

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: "MINIXFM Fundación",
    title: "Escucha la voz de nuestra comunidad",
    description:
      "Cultura, educación, música, patrimonio y participación desde la Región de Coquimbo.",
    href: "/programacion",
    action: "Ver programación",

    // Más adelante aquí llegará la URL desde Supabase.
    imageUrl: null,

    imageAlt:
      "Radio comunitaria MINIXFM conectada con las comunidades del territorio",
    imagePosition: "center center",
    fallbackBackground:
      "bg-gradient-to-r from-[#003f42] via-[#17666a] to-[#299c96]",
  },
  {
    id: 2,
    eyebrow: "Punto de Cultura Comunitaria",
    title: "Talleres para aprender, crear y encontrarnos",
    description:
      "Conozca nuestros espacios de formación artística, cultural y comunitaria.",
    href: "/talleres",
    action: "Conocer talleres",

    imageUrl: null,

    imageAlt:
      "Actividades culturales y talleres comunitarios de MINIXFM",
    imagePosition: "center center",
    fallbackBackground:
      "bg-gradient-to-r from-[#7547d8] via-[#3f75be] to-[#079f9d]",
  },
  {
    id: 3,
    eyebrow: "Comunicación comunitaria",
    title: "Historias y expresiones que nacen desde el territorio",
    description:
      "Difundimos iniciativas, testimonios y contenidos que fortalecen nuestra identidad.",
    href: "/nosotros",
    action: "Conocer MINIXFM",

    imageUrl: null,

    imageAlt:
      "Historias y expresiones culturales de la Región de Coquimbo",
    imagePosition: "center center",
    fallbackBackground:
      "bg-gradient-to-r from-[#d85f0b] via-[#f97316] to-[#d9a319]",
  },
]

export function HomeBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [])

  function showPreviousSlide() {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    )
  }

  function showNextSlide() {
    setCurrentSlide((current) => (current + 1) % slides.length)
  }

  const slide = slides[currentSlide]

  return (
    <section
      className={`relative h-[520px] overflow-hidden rounded-2xl sm:h-[480px] lg:h-[440px] ${slide.fallbackBackground}`}
      aria-label="Contenido destacado de MINIXFM"
      aria-roledescription="carrusel"
    >
      {slide.imageUrl ? (
        <Image
          key={slide.imageUrl}
          src={slide.imageUrl}
          alt={slide.imageAlt}
          fill
          priority={currentSlide === 0}
          sizes="(max-width: 768px) 100vw, 1280px"
          style={{
            objectPosition: slide.imagePosition,
          }}
          className="object-cover"
        />
      ) : null}

      {/* Gradiente que mejora la lectura del texto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#001f21]/95 via-[#003f42]/80 to-[#003f42]/20"
      />

      {/* Oscurecimiento adicional para dispositivos móviles */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/10 sm:bg-transparent"
      />

      <div className="relative flex h-full items-center px-8 py-14 sm:px-16 lg:px-20">
        <div
          className="max-w-3xl text-white"
          aria-live="polite"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/90">
            {slide.eyebrow}
          </p>

          <h1 className="mt-5 line-clamp-2 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>

          <p className="mt-5 line-clamp-3 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            {slide.description}
          </p>

          <Link
            href={slide.href}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#173f42] shadow-lg transition hover:bg-[#f1f3f3]"
          >
            {slide.action}
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={showPreviousSlide}
        aria-label="Mostrar banner anterior"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-3xl text-white backdrop-blur transition hover:bg-black/50 sm:left-5"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={showNextSlide}
        aria-label="Mostrar banner siguiente"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-3xl text-white backdrop-blur transition hover:bg-black/50 sm:right-5"
      >
        ›
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur">
        {slides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Mostrar banner ${index + 1}`}
            aria-current={index === currentSlide}
            className={`h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  )
}