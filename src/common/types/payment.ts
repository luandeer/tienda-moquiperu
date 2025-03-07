export interface Payment {
  id: string
  amount: number // Monto total del pago en PEN
  currency_code: 'PEN'
  status: 'pendiente' | 'autorizado' | 'capturado' | 'reembolsado'
  provider_id: string // Ej: "Visa", "MercadoPago"
  captured_amount: number
  refunded_amount: number
  created_at: string
  updated_at: string
}
