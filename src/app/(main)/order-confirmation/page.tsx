// app/checkout/order-confirmation/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'raiz/src/common/components/ui/button'

export default function OrderConfirmationPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto space-y-4 py-20">
      <h2 className="text-2xl font-semibold">¡Pedido Confirmado!</h2>
      <p>Gracias por tu compra. Tu pedido ha sido confirmado.</p>
      <Button onClick={() => router.push('/')}>Volver al Inicio</Button>
    </div>
  )
}
