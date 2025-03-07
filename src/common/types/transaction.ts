export interface Transaction {
  id: string
  order_id: string
  amount: number // Monto de la transacción en PEN
  currency_code: 'PEN'
  reference: string // Ej: "capture", "refund"
  status: 'completada' | 'fallida'
  created_at: string
  updated_at: string
}
