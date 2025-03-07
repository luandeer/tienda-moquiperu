import { Customer } from './customer'
import { Product } from './product' // Actualizado
import { Payment } from './payment'
import { Shipping } from './shipping'
import { Discount } from './discount'
import { Transaction } from './transaction'

export interface OrderSummary {
  subtotal: number // Subtotal sin impuestos
  tax_total: number // Total de impuestos (IGV)
  shipping_total: number // Costo total de envío
  discount_total: number // Total de descuentos
  total: number // Monto total a pagar
}

export interface Order {
  id: string
  customer_id: string
  email: string
  currency_code: 'PEN'
  display_id: number
  created_at: string
  updated_at: string
  status: 'pendiente' | 'completado' | 'cancelado'
  payment_status: 'pendiente' | 'pagado' | 'reembolsado'
  fulfillment_status: 'en proceso' | 'enviado' | 'entregado'
  customer: Customer
  items: Product[] // Actualizado para usar el tipo Product
  payments: Payment[]
  shipping_methods: Shipping[]
  discounts?: Discount[]
  transactions: Transaction[]
  summary: OrderSummary
}
