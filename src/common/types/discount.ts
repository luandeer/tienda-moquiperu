export interface Discount {
  id: string
  code: string // Ej: "VERANO20"
  amount: number // Monto del descuento en PEN
  description: string
}
