// Función para calcular el precio con descuento
export const calculateDiscountedPrice = (price: number, discount_percentage?: number): number => {
  if (discount_percentage) {
    return price - price * (discount_percentage / 100)
  }
  return price
}
