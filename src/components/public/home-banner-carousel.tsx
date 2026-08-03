"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export type BannerSlide = {
  id: string
  eyebrow: string
  title: string
  description: string
  href: string
  action: string
  imageUrl: string | null
  imageAlt: string
  imagePosition: string
  colorGradientStart: string
  colorGradientEnd: string
  gradientOpacity: number
  textColor: string
  buttonColor: string
  buttonTextColor: string
}

type HomeBannerCarouselProps = {
  slides: BannerSlide[]
}

const fallbackSlides: BannerSlide[] = [
  {
    id: "fallback-minixfm",
    eyebrow: "MINIXFM Fundación",
    title: "Escucha la voz de nuestra comunidad",
    description:
      "Cultura, educación, música, patrimonio y participación desde la Región de Coquimbo.",
    href: "/nosotros",
    action: "Conocer MINIXFM",
    imageUrl: null,
    imageAlt: "",
    imagePosition: "center center",
    colorGradientStart: "#001f21",
    colorGradientEnd: "#17666a",
    gradientOpacity: 95,
    textColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#173f42",
  },
]

function clampOpacity(value: number) {
  return Math.min(Math.max(value, 0), 100)
}

function hexToRgba(
  hex: string,
  opacity: number
) {
  const fallbackHex = "#003f42"

  const validHex = /^#[0-9a-fA-F]{6}$/.test(hex)
    ? hex
    : fallbackHex

  const cleanHex = validHex.replace("#", "")

  const red = Number.parseInt(cleanHex.slice(0, 2), 16)
  const green = Number.parseInt(cleanHex.slice(2, 4), 16)
  const blue = Number.parseInt(cleanHex.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

function BannerButton({
  href,
  label,
  isActive,
  backgroundColor,
  textColor,
}: {
  href: string
  label: string
  isActive: boolean
  backgroundColor: string
  textColor: string
}) {
  if (!href || !label) {
    return null
  }

  const buttonClassName =
    "mt-8 inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"

  const buttonStyle = {
    backgroundColor,
    color: textColor,
  }

  const isExternal =
    href.startsWith("https://") ||
    href.startsWith("http://")

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isActive ? 0 : -1}
        className={buttonClassName}
        style={buttonStyle}
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      href={href}
      tabIndex={isActive ? 0 : -1}
      className={buttonClassName}
      style={buttonStyle}
    >
      {label}
    </Link>
  )
}

export function HomeBannerCarousel({
  slides,
}: HomeBannerCarouselProps) {
  const carouselSlides =
    slides.length > 0 ? slides : fallbackSlides

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (
      isPaused ||
      carouselSlides.length <= 1
    ) {
      return
    }

    const interval = window.setInterval(() => {
      setCurrentSlide(
        (current) =>
          (current + 1) % carouselSlides.length
      )
    }, 6000)

    return () => window.clearInterval(interval)
  }, [isPaused, carouselSlides.length])

  useEffect(() => {
    if (currentSlide >= carouselSlides.length) {
      setCurrentSlide(0)
    }
  }, [currentSlide, carouselSlides.length])

  function showPreviousSlide() {
    setCurrentSlide((current) =>
      current === 0
        ? carouselSlides.length - 1
        : current - 1
    )
  }

  function showNextSlide() {
    setCurrentSlide(
      (current) =>
        (current + 1) % carouselSlides.length
    )
  }

  return (
    <section
      className="relative h-[520px] overflow-hidden rounded-2xl bg-[#003f42] sm:h-[480px] lg:h-[440px]"
      aria-label="Contenido destacado de MINIXFM"
      aria-roledescription="carrusel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {carouselSlides.map((slide, index) => {
        const isActive = index === currentSlide

        const mainOpacity =
          clampOpacity(slide.gradientOpacity) / 100

        const finalOpacity =
          Math.max(
            clampOpacity(slide.gradientOpacity) - 35,
            10
          ) / 100

        const gradient = `linear-gradient(
          90deg,
          ${hexToRgba(
            slide.colorGradientStart,
            mainOpacity
          )} 0%,
          ${hexToRgba(
            slide.colorGradientEnd,
            finalOpacity
          )} 100%
        )`

        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              isActive
                ? "pointer-events-auto z-10 opacity-100"
                : "pointer-events-none z-0 opacity-0"
            }`}
          >
            {slide.imageUrl ? (
              <Image
                src={slide.imageUrl}
                alt={slide.imageAlt}
                fill
                preload={index === 0}
                sizes="(max-width: 768px) 100vw, 1280px"
                style={{
                  objectPosition: slide.imagePosition,
                }}
                className={`object-cover transition-transform duration-[6000ms] ease-out motion-reduce:transition-none ${
                  isActive
                    ? "scale-105"
                    : "scale-100"
                }`}
              />
            ) : null}

            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: gradient,
              }}
            />

            <div
              className="relative flex h-full items-center px-8 py-14 sm:px-16 lg:px-20"
            >
              <div
                className={`max-w-3xl transition-all delay-150 duration-700 ease-out motion-reduce:transition-none ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
                style={{
                  color: slide.textColor,
                }}
              >
                {slide.eyebrow ? (
                  <p
                    className="text-sm font-bold uppercase tracking-[0.22em]"
                    style={{
                      color: slide.textColor,
                      opacity: 0.9,
                    }}
                  >
                    {slide.eyebrow}
                  </p>
                ) : null}

                <h1 className="mt-5 line-clamp-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>

                {slide.description ? (
                  <p
                    className="mt-5 line-clamp-3 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8"
                    style={{
                      color: slide.textColor,
                      opacity: 0.9,
                    }}
                  >
                    {slide.description}
                  </p>
                ) : null}

                <BannerButton
                  href={slide.href}
                  label={slide.action}
                  isActive={isActive}
                  backgroundColor={slide.buttonColor}
                  textColor={slide.buttonTextColor}
                />
              </div>
            </div>
          </div>
        )
      })}

      {carouselSlides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={showPreviousSlide}
            aria-label="Mostrar banner anterior"
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-3xl text-white backdrop-blur transition duration-300 hover:scale-105 hover:bg-black/50 sm:left-5"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={showNextSlide}
            aria-label="Mostrar banner siguiente"
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-3xl text-white backdrop-blur transition duration-300 hover:scale-105 hover:bg-black/50 sm:right-5"
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur">
            {carouselSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`Mostrar banner ${index + 1}`}
                aria-current={
                  index === currentSlide
                    ? "true"
                    : undefined
                }
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}