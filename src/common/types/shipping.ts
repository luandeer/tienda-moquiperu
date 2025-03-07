import { Address } from './address'

export interface Shipping {
  id: string
  method: string // Ej: "Delivery", "Recojo en tienda"
  amount: number // Costo del envío en PEN
  address: Address
  status: 'en proceso' | 'enviado' | 'entregado'
  tracking_number?: string
  created_at: string
  updated_at: string
}
