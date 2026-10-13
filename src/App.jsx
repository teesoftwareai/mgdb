import React from 'react'
import { useState } from 'react'

export default function App() {
  const [showAlert, setShowAlert] = useState(false)

  const handleClick = () => {
    import('sweetalert2').then((sw) => {
      sw.default.fire({
        title: 'Hello!',
        text: 'This is sweetalert2 with TailwindCSS in React',
        icon: 'info'
      })
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Show Sweetalert2
      </button>
    </div>
  )
}