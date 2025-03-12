// app/checkout/delivery/page.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from 'raiz/src/common/components/ui/button'
import { useCheckoutStore } from 'raiz/src/modules/checkout/store/checkout'

export default function DeliveryPage() {
  const router = useRouter()
  const { deliveryMethod, setDeliveryMethod } = useCheckoutStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/checkout/payment')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Método de Envío</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="delivery"
            value="standard"
            checked={deliveryMethod === 'standard'}
            onChange={() => setDeliveryMethod('standard')}
          />
          <span>Entrega Estándar (S/ 8.00)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="delivery"
            value="express"
            checked={deliveryMethod === 'express'}
            onChange={() => setDeliveryMethod('express')}
          />
          <span> Entrega Express (S/ 12.00)</span>
        </label>

        <div className="mt-6 flex items-center gap-2">
          <Link
            href="/checkout/shipping"
            className="flex h-9 items-center rounded-lg border border-gray-200 px-6 text-sm hover:bg-gray-50"
          >
            Volver
          </Link>
          <Button type="submit" className="rounded-lg">
            Continuar
          </Button>
        </div>
      </form>
    </div>
  )
}
