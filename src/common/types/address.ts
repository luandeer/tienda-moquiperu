export interface Address {
  id: string
  userId: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export type AddressForm = Omit<Address, 'id' | 'userId'>
