// app/checkout/delivery/page.tsx
'use client'

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
          <span>Envío Estándar ($8.00)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="delivery"
            value="express"
            checked={deliveryMethod === 'express'}
            onChange={() => setDeliveryMethod('express')}
          />
          <span>Envío Express ($12.00)</span>
        </label>
        <Button type="submit">Continuar</Button>
      </form>
    </div>
  )
}
