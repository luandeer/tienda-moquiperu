export interface ProductVariant {
  id: string // Identificador único de la variante
  name: string // Nombre de la variante (ej: "Azul", "M")
  price: number // Precio de la variante en PEN
  stock: number // Cantidad disponible en stock
  sku: string // Código SKU de la variante
  image?: string // URL de la imagen específica de la variante (opcional)
  discount_percentage?: number // Porcentaje de descuento (opcional)
}

export interface Product {
  id: string // Identificador único del producto
  name: string // Nombre del producto
  description: string // Descripción del producto
  category: string // Categoría del producto (ej: "Ropa", "Electrónica")
  images: string[] // Lista de URLs de imágenes del producto
  variants?: ProductVariant[] // Lista de variantes del producto (opcional)
  price?: number // Precio único cuando no hay variantes (opcional)
  discount_percentage?: number // Porcentaje de descuento a nivel de producto (opcional)
  createdAt: string // Fecha de creación en formato ISO (ej: "2023-10-01T12:00:00Z")
  updatedAt: string // Última actualización en formato ISO
  stock?: number
}
