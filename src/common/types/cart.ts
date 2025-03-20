import { ProductVariant } from './product'

// Producto dentro del carrito (solo con la información relevante)
export type CartItem = {
  productId: string // Referencia al producto
  name: string
  price: number
  image?: string
  variant?: Omit<ProductVariant, 'stock'> // Variante sin stock, ya que en el carrito solo importa el precio y la imagen
  quantity: number
}

// Estado del carrito
export type Cart = {
  items: CartItem[] // Lista de productos en el carrito
  total: number // Precio total del carrito
}
