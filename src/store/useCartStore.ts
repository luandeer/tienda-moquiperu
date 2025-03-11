'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  variant: string
  price: number
  originalPrice: number
  quantity: number
  images: string[]
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => boolean
  // subtotal: number
  // itemsCount: number
  subtotal: () => number
  itemsCount: () => number
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      isOpen: true,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map(
                (i) => (i.id === item.id ? { ...i, quantity: item.quantity } : i)
                // i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              )
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) => {
        const itemFind = get().items.find((item) => item.id === id)
        if (!itemFind) return false
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
        }))
        return true
      },

      itemsCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }),
    {
      name: 'cart',
      skipHydration: true,
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useCartStore

// [
//   {
//     id: '1',
//     name: 'BlendMaster Elite Fusionator',
//     variant: 'US',
//     price: 199.0,
//     originalPrice: 299.0,
//     quantity: 1,
//     images: ['/banner4.jpg']
//   },
//   {
//     id: '2',
//     name: 'BlendMaster Elite Fusionator',
//     variant: 'EU',
//     price: 199.0,
//     originalPrice: 299.0,
//     quantity: 1,
//     images: ['/banner4.jpg']
//   }
// ]
