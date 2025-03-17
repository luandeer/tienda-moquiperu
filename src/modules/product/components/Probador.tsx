'use client'
import { useState, useRef } from 'react'

export default function TryOnShoe() {
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null) // <- Aquí se tipa correctamente

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream // Ahora TypeScript reconoce `srcObject`
      }

      setCameraActive(true)
    } catch (error) {
      console.error('Error al acceder a la cámara:', error)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 'auto' }}>
      {!cameraActive && (
        <button
          onClick={startCamera}
          style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Probar Zapatilla
        </button>
      )}

      {cameraActive && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', borderRadius: '10px' }}
          />

          <img
            src="/1.avif"
            alt="Overlay de Zapatilla"
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150px',
              pointerEvents: 'none'
            }}
          />
        </>
      )}
    </div>
  )
}
