'use client'
import useCartStore from '@/store/useCartStore'
import { formatPricePEN } from '@/lib/utils'
import { Button } from '@/common/components/ui/button'
import Link from 'next/link'
import CartDropdownItem from './CartDropdownItem'
import { useEffect, useRef } from 'react'

const CartDropdown = () => {
  const { items, closeCart } = useCartStore()
  const subtotal = useCartStore((state) => state.subtotal())
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Add animation classes when component mounts
  useEffect(() => {
    const dropdown = dropdownRef.current
    if (dropdown) {
      dropdown.classList.add('opacity-100')
      dropdown.classList.remove('opacity-0')
    }
  }, [])

  return (
    <div
      className="absolute top-full right-0 z-50 mt-4.5 w-[350px] rounded-md border bg-white opacity-0 shadow-lg transition-opacity duration-200"
      ref={dropdownRef}
      id="cart-dropdown"
    >
      <div className="p-4">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          Carrito({items.length}) <span className="text-xs">(vista previa)</span>
        </h2>

        {items.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center">Your cart is empty</p>
        ) : (
          <>
            <div className="max-h-[300px] space-y-4 overflow-auto">
              {items.map((item) => (
                <CartDropdownItem key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between font-medium">
                <span>Subtotal:</span>
                <span>{formatPricePEN(subtotal)}</span>
              </div>

              <div className="mt-4 grid gap-2">
                <Button asChild={true} className="w-full">
                  <Link href="/cart" onClick={closeCart} passHref>
                    Ir al carrito
                  </Link>
                </Button>
                {/* <Button asChild variant="secondary" className="w-full">
                  <Link href="/checkout" onClick={closeCart}>
                    Go to checkout
                  </Link>
                </Button> */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartDropdown
