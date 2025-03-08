'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Badge } from 'raiz/src/common/components/ui/badge'
import { cn } from 'raiz/src/lib/utils'
import { useEffect, useRef, useState } from 'react'

const CauroselProduct = ({ imagenes }: { imagenes: string[] }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  // Productos relacionados
  // const productosRelacionados = [
  //   {
  //     id: 1,
  //     nombre: 'Oferta Familiar',
  //     precio: 'S/45.00',
  //     imagen: '/placeholder.svg?height=200&width=200'
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Combo Individual',
  //     precio: 'S/22.50',
  //     imagen: '/placeholder.svg?height=200&width=200'
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Oferta Especial',
  //     precio: 'S/55.00',
  //     imagen: '/placeholder.svg?height=200&width=200'
  //   }
  // ]

  // Navegar a la imagen anterior
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1))
  }

  // Navegar a la siguiente imagen
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1))
  }

  // Manejar el zoom de la imagen
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  // Scroll a la miniatura activa
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.children[activeImageIndex] as HTMLElement
      if (activeThumb) {
        const scrollLeft =
          activeThumb.offsetLeft -
          thumbnailsRef.current.offsetWidth / 2 +
          activeThumb.offsetWidth / 2
        thumbnailsRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }, [activeImageIndex])
  return (
    <div className="relative">
      {/* Imagen principal con zoom */}
      <div
        ref={imageRef}
        className="relative mb-4 aspect-square cursor-zoom-in overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className={cn(
            'absolute inset-0 transition-transform duration-200 ease-out',
            isZoomed ? 'scale-150' : 'scale-100'
          )}
          style={
            isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined
          }
        >
          <Image
            src={imagenes[activeImageIndex] || '/placeholder.svg'}
            alt="Imagen del producto"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Etiqueta de descuento */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white shadow-md hover:bg-red-600">
            -40%
          </Badge>
        </div>

        {/* Botones de navegación */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg transition-colors hover:bg-gray-50"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-5 w-5 text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-lg transition-colors hover:bg-gray-50"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-5 w-5 text-gray-800" />
        </button>
      </div>

      {/* Carrusel de miniaturas */}
      <div className="relative px-8">
        <div
          ref={thumbnailsRef}
          className="scrollbar-hide flex space-x-3 overflow-x-auto scroll-smooth pb-2"
        >
          {imagenes.map((src, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={cn(
                'h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200',
                activeImageIndex === index
                  ? 'scale-105 shadow-md'
                  : // ? 'scale-105 border-black shadow-md'
                    'border-transparent opacity-70 hover:opacity-100'
              )}
            >
              <div className="relative h-full w-full">
                <Image
                  src={src || '/placeholder.svg'}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Indicadores de navegación */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2">
          <button
            onClick={prevImage}
            className="rounded-full bg-white/90 p-1.5 shadow-md transition-colors hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4 text-gray-800" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2">
          <button
            onClick={nextImage}
            className="rounded-full bg-white/90 p-1.5 shadow-md transition-colors hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4 text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CauroselProduct
