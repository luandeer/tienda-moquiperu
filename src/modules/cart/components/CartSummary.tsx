'use client'
import { Button } from '@/common/components/ui/button'
import { formatPricePEN } from '@/lib/utils'
import useCartStore from '@/store/useCartStore'
import { HelpCircle } from 'lucide-react'
import { Separator } from '@/common/components/ui/separator'
import Link from 'next/link'

const CartSummary = () => {
  const { items } = useCartStore()
  const subtotal = useCartStore((state) => state.subtotal())
  console.log({ subtotal, items })

  // Fixed values for the example
  const shipping = 0
  const taxes = 0
  const total = subtotal + shipping + taxes

  return (
    <div className="rounded-md border p-6">
      <h2 className="mb-6 text-2xl font-bold">Summary</h2>

      <div className="grid gap-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              Subtotal
              <HelpCircle className="text-muted-foreground h-4 w-4" />
            </span>
            <span>{formatPricePEN(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatPricePEN(shipping)}</span>
          </div>

          <div className="flex justify-between">
            <span>Taxes</span>
            <span>{formatPricePEN(taxes)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPricePEN(total)}</span>
        </div>

        <Button asChild size="lg" className="w-full">
          <Link href="/checkout">Go to checkout</Link>
        </Button>
      </div>
    </div>
  )
}

export default CartSummary
