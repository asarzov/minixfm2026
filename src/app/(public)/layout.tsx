import Link from "next/link"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold">
            MINIXFM
          </Link>

          <nav className="flex gap-5 text-sm text-neutral-300">
            <Link href="/">Inicio</Link>
            <Link href="/noticias">Noticias</Link>
            <Link href="/programacion">Programación</Link>
            <Link href="/talleres">Talleres</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-neutral-400">
        Radio Comunitaria Online MINIXFM
      </footer>
    </div>
  )
}