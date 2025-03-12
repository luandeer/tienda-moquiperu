// app/checkout/review/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'raiz/src/common/components/ui/button'
import { useCheckoutStore } from 'raiz/src/modules/checkout/store/checkout'

export default function ReviewPage() {
  const router = useRouter()
  const { shippingAddress, deliveryMethod, paymentMethod } = useCheckoutStore()

  const handleConfirm = () => {
    // Imprime en consola toda la información del checkout
    console.log('Información del Checkout:', {
      shippingAddress,
      deliveryMethod,
      paymentMethod
    })
    // Aquí podrías llamar a tu API para confirmar la orden
    router.push('/order-confirmation')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Revisión Final</h2>
      <div className="space-y-2 rounded-md bg-gray-100 p-4">
        <p>
          <strong>Dirección:</strong> {shippingAddress.firstName} {shippingAddress.lastName},{' '}
          {shippingAddress.address1}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
          {shippingAddress.country}
        </p>
        <p>
          <strong>Método de Envío:</strong> {deliveryMethod === 'standard' ? 'Estándar' : 'Express'}
        </p>
        <p>
          <strong>Método de Pago:</strong> Visa
        </p>
      </div>
      <Button onClick={handleConfirm}>Confirmar Pedido</Button>
    </div>
  )
}
