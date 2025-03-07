export type ProductVariant = {
  id: string
  name: string
  price: number
  stock: number
  sku: string
  image?: string // URL de la imagen específica de la variante (opcional)
  discount_percentage?: number // Porcentaje de descuento (opcional)
}

export type Product = {
  id: string
  name: string
  description: string
  category: string
  images: string[] // Lista de imágenes del producto
  variants?: ProductVariant[] // Lista de variantes del producto
  price?: number // Precio único cuando no hay variantes
  discount_percentage?: number // Porcentaje de descuento a nivel de producto (opcional)
  createdAt: string // Fecha de creación en formato ISO
  updatedAt: string // Última actualización en formato ISO
}
