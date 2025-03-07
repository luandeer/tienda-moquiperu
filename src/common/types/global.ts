export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type StoreFreeShippingPrice = {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}
