'use client'
import useCartStore from '@/store/useCartStore'
import CartItemRow from './CartItemRow'

const CartItems = () => {
  const items = useCartStore((state) => state.items)

  if (items.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="overflow-auto">
      <table className="w-full">
        {/* <CartTableHeader /> */}
        <thead className="text-left">
          <tr className="border-b">
            <th className="pb-4 font-medium">Producto</th>
            <th className="pb-4 text-center font-medium">Cantidad</th>
            <th className="pb-4 text-right font-medium">Precio</th>
            <th className="pb-4 text-right font-medium">Total</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CartItems
