'use client'
import { ChevronLeft, ChevronRight, Heart, Home, Info, ShoppingCart, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from 'raiz/src/common/components/ui/badge'
import { Button } from 'raiz/src/common/components/ui/button'
import CauroselProduct from './components/CarouselProduct'
import useCartStore from 'raiz/src/store/useCartStore'
import { formatPricePEN } from 'raiz/src/lib/utils'
import { mockProducts } from 'raiz/src/common/data/dataTest'
import { useState } from 'react'

const ProductView = ({ productHandle }: { productHandle: string }) => {
  // esto se va a pedir con un fetch a la api por ahora esta en objectos y arrays
  // const product=getProduct(productHandle)

  const [cantidad, setCantidad] = useState(1)

  const findProduct = mockProducts.find(
    (product) => product.name == decodeURIComponent(productHandle)
  )
  const product = {
    id: findProduct?.id || '',
    name: findProduct?.name || '',
    variant: 'US',
    price: 199.0,
    originalPrice: 299.0,
    quantity: cantidad,
    images: findProduct?.images || []
  }

  const { addItem } = useCartStore()

  // producto
  // const product = {
  //   id: '1',
  //   name: 'BlendMaster Elite Fusionator',
  //   variant: 'US',
  //   price: 199.0,
  //   originalPrice: 299.0,
  //   quantity: 1,
  //   images: ['/banner4.jpg']
  // }

  // Productos relacionados
  const productosRelacionados = [
    {
      id: 1,
      name: 'Oferta Familiar',
      price: 'S/45.00',
      images: '/banner4.jpg'
    },
    {
      id: 2,
      name: 'Combo Individual',
      price: 'S/22.50',
      images: '/banner4.jpg'
    },
    {
      id: 3,
      name: 'Oferta Especial',
      price: 'S/55.00',
      images: '/banner4.jpg'
    }
  ]
  if (!findProduct) {
    return <div>Producto no encontrado</div>
  }

  // Incrementar cantidad
  const incrementarCantidad = () => {
    setCantidad((prev) => Math.min(prev + 1, 10)) // Máximo 10 unidades
  }

  // Decrementar cantidad
  const decrementarCantidad = () => {
    setCantidad((prev) => Math.max(prev - 1, 1)) // Mínimo 1 unidad
  }
  // Calcular precio total
  const precioUnitario = product.price
  const precioOriginal = product.originalPrice
  const precioTotal = precioUnitario * cantidad
  const precioOriginalTotal = precioOriginal * cantidad
  const ahorro = precioOriginalTotal - precioTotal

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de navegación */}
      <div className="border-b">
        <div className="container mx-auto flex w-full items-center justify-between py-4">
          <Link href="#" className="flex w-full items-center text-gray-800">
            <ChevronLeft className="mr-1 h-5 w-5" />
            <span>Volver</span>
          </Link>
          <div className="w-full">
            <div className="flex w-full items-center justify-end space-x-2 text-sm">
              <Link href="#" className="flex items-center">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="text-muted-foreground h-4 w-4" />
              <Link href="#" className="text-muted-foreground">
                products
              </Link>
              <ChevronRight className="text-muted-foreground h-4 w-4" />
              <span>{product?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl p-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Galería de imágenes con miniaturas */}
          <CauroselProduct imagenes={product?.images || []} />

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Etiqueta de delivery */}
            <div className="flex items-center justify-between">
              <Badge className="rounded-full bg-[#0f0f0f] px-3 py-1.5 text-sm text-white shadow-sm hover:bg-gray-800">
                <Truck className="mr-1.5 h-4 w-4" />
                Delivery
              </Badge>

              {/* calificacion estrellas talves pueda servir  */}
              {/* <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'h-5 w-5',
                        star <= 4
                          ? 'fill-gray-800 text-gray-800'
                          : 'fill-muted text-muted-foreground'
                      )}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground ml-2 text-sm">(24 reseñas)</span>
              </div> */}
            </div>

            {/* Título y descripción */}
            <div>
              <h1 className="text-2xl font-bold">{product?.name}</h1>
              <p className="text-muted-foreground mt-1 italic">
                &quot;Los mejores precios estan aqui , el lugar mas indicado&quot;
              </p>
            </div>

            {/* Precio */}
            <div className="flex items-center space-x-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <span className="text-3xl font-bold text-black">{formatPricePEN(precioTotal)}</span>
              <div className="flex flex-col">
                <span className="text-muted-foreground line-through">
                  {formatPricePEN(precioOriginalTotal)}
                </span>
                <Badge variant="outline" className="mt-1 border-red-500 text-red-500">
                  Ahorras {formatPricePEN(ahorro)}
                </Badge>
              </div>
              <div className="ml-auto flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm">
                <Info className="mr-1.5 h-4 w-4 text-gray-500" />
                <span>Precio online</span>
              </div>
            </div>

            {/* Cantidad */}
            <div className="flex items-center space-x-4">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                <button
                  onClick={decrementarCantidad}
                  disabled={cantidad <= 1}
                  className="bg-gray-50 px-3 py-1.5 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  -
                </button>
                <span className="min-w-[40px] px-4 py-1.5 text-center font-medium">{cantidad}</span>
                <button
                  onClick={incrementarCantidad}
                  disabled={cantidad >= 10}
                  className="bg-gray-50 px-3 py-1.5 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  +
                </button>
              </div>
              {cantidad > 1 && (
                <span className="text-sm text-gray-500">
                  ({formatPricePEN(precioUnitario)} c/u)
                </span>
              )}
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => {
                  console.log('okee')
                  addItem(product)
                }}
                className="flex-1 cursor-pointer rounded-xl bg-[#0f0f0f] py-6 text-white shadow-md transition-transform hover:scale-[1.02]"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Agregar al carrito
              </Button>
              <Button
                variant="outline"
                className="flex-1 cursor-pointer rounded-xl border-gray-200 bg-white py-6 text-gray-800 hover:bg-gray-50"
              >
                <Heart className="mr-2 h-5 w-5" />
                Guardar para después
              </Button>
            </div>

            {/* Detalles del producto */}
            <div>
              <h2 className="mb-2 text-lg font-semibold">¿Qué incluye este producto?</h2>
              <p></p>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-black">También te podría gustar</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productosRelacionados.map((producto) => (
              <div
                key={producto.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square">
                  <Image
                    src={producto.images[0] || '/placeholder.svg'}
                    alt={producto.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{producto.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-black">{producto.price}</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductView
