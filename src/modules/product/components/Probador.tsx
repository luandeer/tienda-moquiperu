'use client'
import React, { useRef, useState, useEffect } from 'react'
import * as posenet from '@tensorflow-models/posenet'
import '@tensorflow/tfjs' // Asegura que se cargue tf

const TryOnShoe: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [model, setModel] = useState<posenet.PoseNet | null>(null)
  const shoeImgRef = useRef<HTMLImageElement | null>(null)

  // Pre-carga de la imagen del overlay (la zapatilla)
  useEffect(() => {
    const img = new Image()
    img.src = '/prueba.png' // Coloca la imagen en la carpeta public
    shoeImgRef.current = img
  }, [])

  // Al activar la cámara, cargamos el modelo PoseNet
  useEffect(() => {
    if (!cameraActive) return
    const loadModel = async () => {
      const net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75
      })
      setModel(net)
    }
    loadModel()
  }, [cameraActive])

  // Bucle de detección: procesamos cada frame del video
  useEffect(() => {
    let animationFrameId: number

    const detectPose = async () => {
      if (videoRef.current && model && canvasRef.current) {
        const pose = await model.estimateSinglePose(videoRef.current, {
          flipHorizontal: false
        })
        drawShoeOverlay(pose)
      }
      animationFrameId = requestAnimationFrame(detectPose)
    }

    if (cameraActive && model) {
      detectPose()
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [cameraActive, model])

  // Función para dibujar la zapatilla adaptada al pie
  const drawShoeOverlay = (pose: posenet.Pose) => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !videoRef.current || !shoeImgRef.current) return
    if (!canvasRef.current) return // Si el canvas aún no existe, salimos de la función

    // Aseguramos que el canvas tenga el mismo tamaño que el video
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Obtener keypoints para el pie izquierdo: tobillo y rodilla
    const leftAnkle = pose.keypoints.find((k) => k.part === 'leftAnkle' && k.score > 0.5)
    const leftKnee = pose.keypoints.find((k) => k.part === 'leftKnee' && k.score > 0.5)

    if (leftAnkle && leftKnee) {
      // Coordenadas en píxeles (relativas al video)
      const { x: ankleX, y: ankleY } = leftAnkle.position
      const { x: kneeX, y: kneeY } = leftKnee.position

      // Calcular el ángulo de la pierna
      const angle = Math.atan2(ankleY - kneeY, ankleX - kneeX)

      // Calcular la distancia entre la rodilla y el tobillo (usada para escalar el overlay)
      const distance = Math.hypot(ankleX - kneeX, ankleY - kneeY)
      const shoeWidth = distance * 2 // Factor ajustable según la imagen de la zapatilla
      const shoeHeight = shoeWidth * (shoeImgRef.current.height / shoeImgRef.current.width)

      // Dibujar la imagen de la zapatilla rotada, centrada en el tobillo
      ctx.save()
      ctx.translate(ankleX, ankleY)
      ctx.rotate(angle)
      // Ajustamos para que la imagen se dibuje centrada en el tobillo (la parte superior de la zapatilla)
      ctx.drawImage(shoeImgRef.current, -shoeWidth / 2, 0, shoeWidth, shoeHeight)
      ctx.restore()
    }
  }

  // Función para iniciar la cámara
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadeddata = () => {
          setCameraActive(true)
        }
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
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', display: cameraActive ? 'block' : 'none' }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none' }}
      />
    </div>
  )
}

export default TryOnShoe
