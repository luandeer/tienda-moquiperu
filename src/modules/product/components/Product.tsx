'use client'
import { Info, ShoppingCart } from 'lucide-react'
import { Badge } from 'raiz/src/common/components/ui/badge'
import { Button } from 'raiz/src/common/components/ui/button'
import { mockProducts } from 'raiz/src/common/data/dataTest'
import { cn, formatPricePEN } from 'raiz/src/lib/utils'
import useCartStore, { CartItem } from 'raiz/src/store/useCartStore'
import { useEffect, useState } from 'react'
import CauroselProduct from './CarouselProduct'
import QuantityProduct from './QuantityProduct'
import TryOnShoe from './Probador'
// import QuantityProduct from './QuantityProduct'

const Product = ({ productHandle }: { productHandle: string }) => {
  // esto se va a pedir con un fetch a la api por ahora esta en objectos y arrays
  // const product=getProduct(productHandle)

  const { items, addItem, removeItem } = useCartStore()

  const findProduct = mockProducts.find(
    (product) => product.name == decodeURIComponent(productHandle)
  )

  // console.log(findProduct)
  // console.log(items.find((item) => item.id == findProduct?.id)?.quantity)
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    setCantidad(items.find((item) => item.id == findProduct?.id)?.quantity || 1)
  }, [items])

  // const product = {
  //   id: findProduct?.id || '',
  //   name: findProduct?.name || '',
  //   variant: 'US',
  //   price: findProduct?.price || 199,
  //   originalPrice: 299.0,

  //   quantity: cantidad,
  //   images: findProduct?.images || []
  // }

  const product = {
    ...findProduct,
    quantity: cantidad
  }

  // const { addItem } = useCartStore()

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

  if (!findProduct) {
    return <div>Producto no encontrado</div>
  }

  const isInCart = items.find((item) => item.id == findProduct?.id)

  // Calcular precio total
  // const precioUnitario = product.price
  // const precioOriginal = product.originalPrice
  // const precioTotal = precioUnitario * cantidad
  // const precioOriginalTotal = precioOriginal * cantidad
  // const ahorro = precioOriginalTotal - precioTotal

  const precio = product.price || 0
  const porcentajeDescuento = product.discount_percentage || 0
  const precioDescuento = precio - precio * (porcentajeDescuento / 100)

  const precioTotal = precio * cantidad
  const precioDescuentoTotal = precioDescuento * cantidad
  const ahorro = precioTotal - precioDescuentoTotal

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Galería de imágenes con miniaturas */}
      <CauroselProduct imagenes={product?.images || []} />

      {/* Información del producto */}
      <div className="space-y-6">
        {/* Etiqueta de delivery */}
        <div className="flex items-center justify-between">
          {/* <Badge className="rounded-full bg-[#0f0f0f] px-3 py-1.5 text-sm text-white shadow-sm hover:bg-gray-800">
                <Truck className="mr-1.5 h-4 w-4" />
                Delivery
              </Badge> */}

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
          <h1 className="text-2xl font-semibold text-[#030712]">{product?.name}</h1>
          <p className="mt-1 text-[#4b5563]">
            Los mejores precios estan aqui , el lugar mas indicado
          </p>
        </div>

        {/* Precio */}
        <div className="flex flex-col items-center gap-2 space-x-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center sm:flex-row sm:gap-0 sm:text-start">
          <span className="text-3xl font-bold text-black">
            {formatPricePEN(precioDescuentoTotal)}
          </span>
          {porcentajeDescuento != 0 && (
            <div className="flex flex-col">
              <span className="text-muted-foreground line-through">
                {formatPricePEN(precioTotal)}
              </span>
              <Badge variant="outline" className="mt-1 border-red-500 text-red-500">
                Ahorras {formatPricePEN(ahorro)}
              </Badge>
            </div>
          )}
          <div className="flex items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm sm:ml-auto">
            <Info className="mr-1.5 h-4 w-4 text-gray-500" />
            <span>Precio online</span>
          </div>
        </div>

        {/* Cantidad */}
        <QuantityProduct
          idProduct={product.id || ''}
          quantity={cantidad}
          setQuantity={setCantidad}
          price={precioDescuento}
        />

        {/* Botones de acción */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {isInCart ? (
            <Button
              onClick={() => removeItem(product.id || '')}
              className={cn(
                'h-auto flex-1 cursor-pointer rounded-xl bg-[#e03737] py-3.5 text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-[#e03737]'
              )}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Eliminar del carrito
            </Button>
          ) : (
            <Button
              onClick={() => addItem(product as CartItem)}
              className={cn(
                'h-auto flex-1 cursor-pointer rounded-xl bg-[#0f0f0f] py-3.5 text-white shadow-md transition-transform hover:scale-[1.02]'
              )}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </Button>
          )}

          {/* <Button
                variant="outline"
                className="flex-1 cursor-pointer rounded-xl border-gray-200 bg-white py-6 text-gray-800 hover:bg-gray-50"
              >
                <Heart className="mr-2 h-5 w-5" />
                Guardar para después
              </Button> */}
        </div>
        <TryOnShoe />
        {/* Detalles del producto */}
        {/* <div>
          <h2 className="mb-2 text-lg font-semibold">¿Qué incluye este producto?</h2>
          <p></p>
        </div> */}
      </div>
    </div>
  )
}

export default Product
