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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-neutral-950/95 text-white shadow-2xl backdrop-blur">
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

      <div className="mx-auto flex min-h-20 max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={togglePlayback}
          disabled={!streamUrl}
          aria-label={
            isPlaying
              ? "Pausar señal de MINIXFM"
              : "Reproducir señal de MINIXFM"
          }
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isPlaying
                  ? "animate-pulse bg-red-500"
                  : "bg-neutral-600"
              }`}
            />

            <p className="truncate text-sm font-semibold">
              MINIXFM en vivo
            </p>
          </div>

          <p className="mt-1 truncate text-xs text-neutral-400">
            {getStatusText()}
          </p>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-xs text-neutral-400">
            Volumen
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volumen"
            className="w-28 accent-orange-500"
          />
        </div>
      </div>
    </div>
  )
}