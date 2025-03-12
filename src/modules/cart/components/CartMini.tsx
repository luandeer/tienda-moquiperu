'use client'
import { useRef, useState, useEffect } from 'react'
import { Button } from '@/common/components/ui/button'
import useCartStore from 'raiz/src/store/useCartStore'
import CartDropdown from './CartDropdown'
import { ShoppingBag } from 'lucide-react'

export default function NavbarCart() {
  const { openCart, closeCart, isOpen } = useCartStore()
  const itemsCount = useCartStore((state) => state.itemsCount())
  const cartRef = useRef<HTMLDivElement>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [leaveTimeout, setLeaveTimeout] = useState<NodeJS.Timeout | null>(null)

  const [isHydrated, setIsHydrated] = useState(false)

  // Detectar si es un dispositivo táctil
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseEnter = () => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout)
      setLeaveTimeout(null)
    }

    if (!isOpen && !isTouchDevice) {
      const timeout = setTimeout(() => {
        openCart()
      }, 200) // Pequeño retraso para evitar aperturas accidentales

      setHoverTimeout(timeout)
    }
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }

    if (isOpen && !isTouchDevice) {
      const timeout = setTimeout(() => {
        closeCart()
      }, 300) // Retraso para permitir mover el mouse al dropdown

      setLeaveTimeout(timeout)
    }
  }

  const handleClick = () => {
    if (isTouchDevice) {
      if (isOpen) {
        closeCart()
      } else {
        openCart()
      }
    }
  }

  useEffect(() => {
    useCartStore.persist.rehydrate()
    setIsHydrated(true)
  }, [])

  if (!isHydrated) return null

  return (
    <div
      className="relative"
      ref={cartRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        // variant="ghost"
        className="relative cursor-pointer gap-1 bg-transparent text-sm hover:bg-transparent"
        id="cart-toggle"
        onClick={handleClick}
      >
        <ShoppingBag className="size-5" />{' '}
        <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-gray-50 text-xs text-black">
          {itemsCount}
        </span>
      </Button>

      {isOpen && <CartDropdown />}
    </div>
  )
}
