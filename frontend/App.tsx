import { useEffect } from "react"

export default function App() {
  useEffect(() => {
    const el = document.querySelector(`.cursor-spot`) as HTMLElement
    const onMove = (e: MouseEvent) => {
      el?.style.setProperty(`--mx`, `${e.clientX}px`)
      el?.style.setProperty(`--my`, `${e.clientY}px`)
    }
    window.addEventListener(`mousemove`, onMove, { passive: true })
    return () => window.removeEventListener(`mousemove`, onMove)
  }, [])

  return (
    <div className="flex-center flex-col h-screen w-full" aria-hidden="true">
      <div>
        <h1 className="text-accent">I'm Artiom</h1>
        <p className="text-xl">Hello world :)</p>
      </div>
    </div>
  )
}