export interface Address {
  id: string
  address_name: string
  address_1: string
  city: string
  province: string
  district: string
  postal_code?: string
  country_code: 'PE'
  is_default_shipping: boolean
  is_default_billing: boolean
}
