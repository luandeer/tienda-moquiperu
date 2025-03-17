/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef, useState } from 'react'
import mpPose from '@mediapipe/pose'

export default function TryOnShoe() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const poseRef = useRef<any>(null) // Utilizamos any para simplificar

  useEffect(() => {
    if (!cameraActive || !videoLoaded) return

    // Ajustar dimensiones del canvas para que coincidan con el video
    if (videoRef.current && canvasRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
    }

    // Cargar el modelo de Pose
    const pose = new mpPose.Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    })

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    })

    pose.onResults(onResults)
    poseRef.current = pose

    // Iniciar la detección en bucle
    const detectPose = async () => {
      if (videoRef.current) {
        await pose.send({ image: videoRef.current })
        requestAnimationFrame(detectPose)
      }
    }

    detectPose()
  }, [cameraActive, videoLoaded])

  const onResults = (results: any) => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    if (!results.poseLandmarks) return

    console.log('Landmarks detectados:', results.poseLandmarks) // Para depuración

    const leftAnkle = results.poseLandmarks[27] // Tobillo izquierdo
    const rightAnkle = results.poseLandmarks[28] // Tobillo derecho

    const shoeImg = new Image()
    shoeImg.src = '/prueba.png' // Asegúrate de tener esta imagen en /public/
    shoeImg.onload = () => {
      const shoeWidth = Math.abs(rightAnkle.x - leftAnkle.x) * canvasRef.current!.width * 1.5
      const shoeX = leftAnkle.x * canvasRef.current!.width
      const shoeY = leftAnkle.y * canvasRef.current!.height

      ctx.drawImage(shoeImg, shoeX, shoeY, shoeWidth, shoeWidth * 0.5)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadeddata = () => {
          setVideoLoaded(true)
        }
        setCameraActive(true)
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: 'auto' }}>
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
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', display: 'block' }} />
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              pointerEvents: 'none'
            }}
          />
        </>
      )}
    </div>
  )
}
