"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const slides = [
  {
    eyebrow: "MINIXFM Fundación",
    title: "Escucha la voz de nuestra comunidad",
    description:
      "Cultura, educación, música, patrimonio y participación desde la Región de Coquimbo.",
    href: "/programacion",
    action: "Ver programación",
    background:
      "bg-gradient-to-r from-[#7349df] via-[#467fca] to-[#00aaa7]",
  },
  {
    eyebrow: "Punto de Cultura Comunitaria",
    title: "Talleres para aprender, crear y encontrarnos",
    description:
      "Conozca nuestros espacios de formación artística, cultural y comunitaria.",
    href: "/talleres",
    action: "Conocer talleres",
    background:
      "bg-gradient-to-r from-[#ef5b18] via-[#f59e0b] to-[#4f8a45]",
  },
  {
    eyebrow: "Comunicación comunitaria",
    title: "Historias y expresiones que nacen desde el territorio",
    description:
      "Difundimos iniciativas, testimonios y contenidos que fortalecen nuestra identidad.",
    href: "/nosotros",
    action: "Conocer MINIXFM",
    background:
      "bg-gradient-to-r from-[#003f42] via-[#17666a] to-[#299c96]",
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
      className={`relative min-h-[390px] overflow-hidden rounded-2xl ${slide.background}`}
      aria-label="Contenido destacado de MINIXFM"
      aria-roledescription="carrusel"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.20),transparent_30%)]"
      />

      <div className="relative grid min-h-[390px] items-center gap-10 px-8 py-14 sm:px-16 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="max-w-3xl text-white" aria-live="polite">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/90">
            {slide.eyebrow}
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {slide.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">
            {slide.description}
          </p>

          <Link
            href={slide.href}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#173f42] transition hover:bg-[#eeeeec]"
          >
            {slide.action}
          </Link>
        </div>

        <div className="hidden justify-center lg:flex">
          <div className="rounded-full bg-white/15 p-7 backdrop-blur-sm">
            <Image
              src="/logos/minixfm-logo-white.png"
              alt=""
              width={220}
              height={220}
              priority
              className="h-52 w-52 object-contain"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={showPreviousSlide}
        aria-label="Mostrar banner anterior"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-3xl text-white backdrop-blur transition hover:bg-black/40 sm:left-5"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={showNextSlide}
        aria-label="Mostrar banner siguiente"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-3xl text-white backdrop-blur transition hover:bg-black/40 sm:right-5"
      >
        ›
      </button>

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((item, index) => (
          <button
            key={item.title}
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