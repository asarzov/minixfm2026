"use client"

import { useFormStatus } from "react-dom"

export function DeleteNewsButton() {
  const { pending } = useFormStatus()

  function confirmDelete(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar esta noticia? Esta acción no se puede deshacer."
    )

    if (!confirmed) {
      event.preventDefault()
    }
  }

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={confirmDelete}
      className="inline-flex min-h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Eliminando..." : "Eliminar"}
    </button>
  )
}