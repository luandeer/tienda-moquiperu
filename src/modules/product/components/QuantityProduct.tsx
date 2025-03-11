import { cn, formatPricePEN } from 'raiz/src/lib/utils'
import useCartStore from 'raiz/src/store/useCartStore'
import { Dispatch, SetStateAction } from 'react'

const QuantityProduct = ({
  idProduct,
  quantity,
  setQuantity,
  price,
  size = 'default'
}: {
  idProduct: string
  quantity: number
  setQuantity?: Dispatch<SetStateAction<number>>
  price?: number
  size?: 'tiny' | 'default'
}) => {
  // const [quantityLocal, setQuantityLocal] = useState(1)
  const { updateQuantity } = useCartStore()

  // Incrementar quantity
  const incrementarCantidad = () => {
    // setCantidad((prev) => Math.min(prev + 1, 10)) // Máximo 10 unidades
    const updated = updateQuantity(idProduct, Math.min(quantity + 1, 10))

    if (!updated && setQuantity) {
      setQuantity((prev) => Math.min(prev + 1, 10))
    }
  }

  // Decrementar quantity
  const decrementarCantidad = () => {
    // setCantidad((prev) => Math.max(prev - 1, 1)) // Mínimo 1 unidad
    const updated = updateQuantity(idProduct, Math.max(quantity - 1, 1))
    if (!updated && setQuantity) {
      setQuantity((prev) => Math.max(prev - 1, 10))
    }
  }
  return (
    <div className="flex items-center space-x-4">
      {size != 'tiny' && <span className="font-normal">Cantidad:</span>}

      <div
        className={cn(
          'flex items-center overflow-hidden rounded-lg border border-gray-200',
          size == 'tiny' && 'flex-col text-xs sm:flex-row'
        )}
      >
        <button
          onClick={decrementarCantidad}
          // disabled={quantity <= 1}
          className="bg-gray-50 px-3 py-1.5 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          -
        </button>
        <span
          className={cn(
            'px-4 py-1.5 text-center font-medium sm:min-w-[40px]',
            size == 'tiny' && 'px-2 sm:px-4'
          )}
        >
          {quantity}
          {/* {quantityLocal} */}
        </span>
        <button
          onClick={incrementarCantidad}
          disabled={quantity >= 10}
          className="bg-gray-50 px-3 py-1.5 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          +
        </button>
      </div>
      {size != 'tiny' && quantity > 1 && (
        <span className="text-sm text-gray-500">({formatPricePEN(price || 0)} c/u)</span>
      )}
    </div>
  )
}

export default QuantityProduct
