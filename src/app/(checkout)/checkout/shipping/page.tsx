// app/checkout/shipping/page.tsx
'use client'

// Ajusta la ruta según tu configuración
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCheckoutStore } from 'raiz/src/modules/checkout/store/checkout'
import { Label } from 'raiz/src/common/components/ui/label'
import { Input } from 'raiz/src/common/components/ui/input'
import { Button } from 'raiz/src/common/components/ui/button'

export default function ShippingPage() {
  const router = useRouter()
  const { shippingAddress, setShippingAddress } = useCheckoutStore()
  const [localData, setLocalData] = useState(shippingAddress)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShippingAddress(localData)
    router.push('/checkout/delivery')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dirección de Envío</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2.5">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            type="text"
            required
            value={localData.firstName}
            onChange={(e) => setLocalData({ ...localData, firstName: e.target.value })}
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            type="text"
            required
            value={localData.lastName}
            onChange={(e) => setLocalData({ ...localData, lastName: e.target.value })}
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="address1">Dirección</Label>
          <Input
            id="address1"
            type="text"
            required
            value={localData.address1}
            onChange={(e) => setLocalData({ ...localData, address1: e.target.value })}
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="city">Ciudad</Label>
          <Input
            id="city"
            type="text"
            required
            value={localData.city}
            onChange={(e) => setLocalData({ ...localData, city: e.target.value })}
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="postalCode">Código Postal</Label>
          <Input
            id="postalCode"
            type="text"
            required
            value={localData.postalCode}
            onChange={(e) => setLocalData({ ...localData, postalCode: e.target.value })}
          />
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="country">País</Label>
          <Input
            id="country"
            type="text"
            required
            value={localData.country}
            onChange={(e) => setLocalData({ ...localData, country: e.target.value })}
          />
        </div>
        <Button type="submit" className="mt-4 rounded-lg">
          Continuar
        </Button>
      </form>
    </div>
  )
}
