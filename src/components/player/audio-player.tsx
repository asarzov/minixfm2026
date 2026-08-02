"use client"

import { useRef, useState } from "react"

type PlayerStatus =
  | "idle"
  | "connecting"
  | "playing"
  | "paused"
  | "error"

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [status, setStatus] = useState<PlayerStatus>("idle")

  const streamUrl = process.env.NEXT_PUBLIC_RADIO_STREAM_URL

  async function togglePlayback() {
    const audio = audioRef.current

    if (!audio || !streamUrl) {
      setStatus("error")
      return
    }

    if (audio.paused) {
      try {
        setStatus("connecting")
        await audio.play()
      } catch {
        setIsPlaying(false)
        setStatus("error")
      }
    } else {
      audio.pause()
    }
  }

  function handleVolumeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newVolume = Number(event.target.value)

    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  function getStatusText() {
    if (!streamUrl) {
      return "Señal pendiente de configuración"
    }

    switch (status) {
      case "connecting":
        return "Conectando con la señal..."
      case "playing":
        return "Transmitiendo en vivo"
      case "paused":
        return "Reproducción pausada"
      case "error":
        return "No fue posible conectar"
      default:
        return "Señal disponible"
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#003f42] text-white shadow-2xl">
      <audio
        ref={audioRef}
        src={streamUrl || undefined}
        preload="none"
        playsInline
        onPlaying={() => {
          setIsPlaying(true)
          setStatus("playing")
        }}
        onPause={() => {
          setIsPlaying(false)
          setStatus("paused")
        }}
        onWaiting={() => {
          setStatus("connecting")
        }}
        onError={() => {
          setIsPlaying(false)
          setStatus("error")
        }}
      />

      <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 sm:flex">
          <span className="text-xl" aria-hidden="true">
            🎙
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isPlaying
                  ? "animate-pulse bg-[#f97316]"
                  : "bg-white/30"
              }`}
            />

            <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              En vivo ahora
            </p>
          </div>

          <p className="mt-1 truncate font-semibold">
            MINIXFM Fundación
          </p>

          <p className="truncate text-xs text-white/60">
            {getStatusText()}
          </p>
        </div>

        <button
          type="button"
          onClick={togglePlayback}
          disabled={!streamUrl}
          aria-label={
            isPlaying
              ? "Pausar señal de MINIXFM"
              : "Reproducir señal de MINIXFM"
          }
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-bold text-[#003f42] transition hover:bg-[#f2f2f2] disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:w-14"
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>

        <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
          <span aria-hidden="true" className="text-lg">
            🔊
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volumen"
            className="w-28 accent-[#f97316]"
          />
        </div>
      </div>
    </div>
  )
}