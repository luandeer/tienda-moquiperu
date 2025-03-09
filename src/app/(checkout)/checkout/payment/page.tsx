// app/checkout/payment/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'raiz/src/common/components/ui/button'
import { Input } from 'raiz/src/common/components/ui/input'
import { Label } from 'raiz/src/common/components/ui/label'
import { useCheckoutStore } from 'raiz/src/modules/checkout/store/checkout'
import { useState } from 'react'

export default function PaymentPage() {
  const router = useRouter()
  const { paymentMethod, setPaymentMethod } = useCheckoutStore()
  const [cardNumber, setCardNumber] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí integrarías tu pasarela de pago real, si corresponde
    router.push('/checkout/review')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Método de Pago</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={() => setPaymentMethod('credit_card')}
          />
          <span>Tarjeta de Crédito</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />
          <span>PayPal</span>
        </label>
        {paymentMethod === 'credit_card' && (
          <div>
            <Label htmlFor="cardNumber">Número de Tarjeta</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
        )}
        <Button type="submit">Continuar</Button>
      </form>
    </div>
  )
}
