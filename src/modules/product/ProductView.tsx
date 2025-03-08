import { ChevronLeft, ChevronRight, Heart, Home, Info, ShoppingCart, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from 'raiz/src/common/components/ui/badge'
import { Button } from 'raiz/src/common/components/ui/button'
import CauroselProduct from './components/CarouselProduct'

const ProductView = ({ productHandle }: { productHandle: string }) => {
  // esto se va a pedir con un fetch a la api por ahora esta en objectos y arrays
  // const product=getProduct(productHandle)
  console.log(productHandle)

  // producto
  const product = {
    id: 1,
    nombre: 'Oferta Lote',
    precio: 'S/45.00',
    imagenes: ['/banner4.jpg', '/banner4.jpg']
  }

  // Productos relacionados
  const productosRelacionados = [
    {
      id: 1,
      nombre: 'Oferta Familiar',
      precio: 'S/45.00',
      imagen: '/banner4.jpg'
    },
    {
      id: 2,
      nombre: 'Combo Individual',
      precio: 'S/22.50',
      imagen: '/banner4.jpg'
    },
    {
      id: 3,
      nombre: 'Oferta Especial',
      precio: 'S/55.00',
      imagen: '/banner4.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Barra de navegación */}
      <header className="flex items-center border-b p-4">
        <Link href="#" className="flex items-center text-gray-800">
          <ChevronLeft className="mr-1 h-5 w-5" />
          <span>Volver</span>
        </Link>
        <div className="flex flex-1 justify-center">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="#" className="flex items-center">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="text-muted-foreground h-4 w-4" />
            <Link href="#" className="text-muted-foreground">
              products
            </Link>
            <ChevronRight className="text-muted-foreground h-4 w-4" />
            <span>{product.nombre}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Galería de imágenes con miniaturas */}
          <CauroselProduct imagenes={product.imagenes} />

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
              <h1 className="text-2xl font-bold">{product.nombre}</h1>
              <p className="text-muted-foreground mt-1 italic">
                &quot;Los mejores precio estan aqui , el lugar mas indicado&quot;
              </p>
            </div>

            {/* Precio */}
            <div className="flex items-center space-x-3 rounded-xl border border-gray-100 bg-white p-4">
              <span className="text-3xl font-bold text-gray-900">S/39.00</span>
              <div className="flex flex-col">
                <span className="text-muted-foreground line-through">{product.precio}</span>
                <Badge variant="outline" className="mt-1 border-red-500 text-red-500">
                  Ahorras S/26.00
                </Badge>
              </div>
              <div className="ml-auto flex items-center rounded-lg border border-gray-100 bg-white px-3 py-1.5 text-sm">
                <Info className="mr-1.5 h-4 w-4 text-gray-500" />
                <span>Precio online</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="flex-1 cursor-pointer rounded-xl bg-[#0f0f0f] py-6 text-white shadow-md transition-transform hover:scale-[1.02]">
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
              <p>LOrem</p>
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
                    src={producto.imagen || '/placeholder.svg'}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{producto.nombre}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-black">{producto.precio}</span>
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
