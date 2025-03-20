export type ProductVariant = {
  id: string
  name: string
  price: number
  stock: number
  sku: string // SKU obligatorio en variantes
  image?: string // URL de la imagen específica de la variante
  discount_percentage?: number // Descuento solo en esta variante
}

export type Product = {
  id: string // ID obligatorio
  name: string
  sku?: string // SKU opcional cuando hay variantes
  description?: string
  category?: string
  images?: string[] // Lista de imágenes del producto
  stock?: number // Stock solo si no tiene variantes
  variants?: ProductVariant[] // Variantes del producto
  price?: number // Precio único si no tiene variantes
  discount_percentage?: number // Descuento a nivel de producto
  createdAt: string // Fecha de creación en formato ISO
  updatedAt?: string // Última actualización en formato ISO
  manualUrl?: string // URL de un manual o PDF
}

export type ProductForm = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
