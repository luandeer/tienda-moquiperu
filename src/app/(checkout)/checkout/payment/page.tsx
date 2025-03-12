// app/checkout/payment/page.tsx
'use client'

import Link from 'next/link'
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
      <form onSubmit={handleSubmit} className="space-y-2" autoComplete="on">
        <label className="flex items-start gap-2">
          <input
            type="radio"
            name="payment"
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={() => setPaymentMethod('credit_card')}
          />
          <div className="flex flex-col gap-1 leading-none">
            <span>Tarjeta de Crédito/Débito</span>
            <span className="text-xs text-gray-400">
              (Aceptamos Visa, Mastercard, American Express y Diners Club)
            </span>
          </div>
        </label>
        <label className="mb-6 flex items-center gap-2">
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
            <Label htmlFor="cardNumber" className="mb-2">
              Número de Tarjeta
            </Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              autoComplete="cc-exp" // ✅ Corregido, ahora es para la fecha de expiración
              inputMode="numeric"
            />

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiracion">Fecha de expiración</Label>
                <Input
                  id="expiracion"
                  placeholder="MM/AA"
                  autoComplete="cc-csc"
                  inputMode="numeric"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">Código de seguridad (CVV)</Label>
                <Input id="cvv" placeholder="123" maxLength={4} />
              </div>
            </div>
          </div>
        )}
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
