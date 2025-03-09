// app/checkout/store.ts
'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Address {
  firstName: string
  lastName: string
  address1: string
  city: string
  postalCode: string
  country: string
}

interface CheckoutState {
  shippingAddress: Address
  setShippingAddress: (addr: Address) => void
  deliveryMethod: string
  setDeliveryMethod: (method: string) => void
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shippingAddress: {
        firstName: '',
        lastName: '',
        address1: '',
        city: '',
        postalCode: '',
        country: ''
      },
      setShippingAddress: (addr) => set({ shippingAddress: addr }),

      deliveryMethod: 'standard',
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),

      paymentMethod: '',
      setPaymentMethod: (method) => set({ paymentMethod: method })
    }),
    {
      name: 'checkout-storage', // clave en localStorage
      storage: createJSONStorage(() => localStorage)
    }
  )
)
