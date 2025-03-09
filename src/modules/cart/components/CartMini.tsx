'use client'
import { useRef, useState, useEffect } from 'react'
import { Button } from '@/common/components/ui/button'
import useCartStore from 'raiz/src/store/useCartStore'
import CartDropdown from './CartDropdown'

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
        className="cursor-pointer gap-1 bg-transparent text-sm font-medium hover:bg-transparent"
        id="cart-toggle"
        onClick={handleClick}
      >
        Cart ({itemsCount})
      </Button>

      {isOpen && <CartDropdown />}
    </div>
  )
}
