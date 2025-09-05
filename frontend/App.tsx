import { useEffect, useState } from "react"

export default function App() {
  const [message, setMessage] = useState(``)

  useEffect(() => {
    fetch(`/api/`).then(res => res.json()).then(data => {
      setMessage(data.message)
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello, Vite + React!</h1>
      <p>{message}</p>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}