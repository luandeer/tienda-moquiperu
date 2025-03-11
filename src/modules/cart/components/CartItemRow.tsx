'use client'
import { Button } from '@/common/components/ui/button'
import { formatPricePEN } from '@/lib/utils'
import useCart, { type CartItem } from '@/store/useCartStore'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import QuantityProduct from '../../product/components/QuantityProduct'

const CartItemRow = ({ item }: { item: CartItem }) => {
  const { removeItem } = useCart()

  return (
    <tr className="border-b">
      <td className="py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>

          <div className="bg-secondary relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={item.images[0] || '/banner4.jpg'}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-medium">{item.name}</h3>
            {/* <p className="text-muted-foreground text-sm">Variant: {item.variant}</p> */}
          </div>
        </div>
      </td>

      <td className="py-4">
        <div className="flex justify-center">
          <QuantityProduct idProduct={item.id} quantity={item.quantity} size="tiny" />
        </div>
      </td>

      <td className="py-4 text-right text-sm">
        <div className="flex flex-col items-end">
          <span className="text-muted-foreground text-sm line-through">
            {formatPricePEN(item.originalPrice)}
          </span>
          <span className="font-medium text-blue-600">{formatPricePEN(item.price)}</span>
        </div>
      </td>

      <td className="py-4 text-right text-sm">
        <div className="flex flex-col items-end">
          <span className="text-muted-foreground text-sm line-through">
            {formatPricePEN(item.originalPrice * item.quantity)}
          </span>
          <span className="font-medium text-blue-600">
            {formatPricePEN(item.price * item.quantity)}
          </span>
        </div>
      </td>
    </tr>
  )
}

export default CartItemRow
