'use client'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/common/components/ui/button'
import { formatPricePEN } from '@/lib/utils'
import useCartStore, { CartItem } from '@/store/useCartStore'
import Link from 'next/link'

export default function CartDropdownItem({ item }: { item: CartItem }) {
  const { removeItem } = useCartStore()

  const precio = item.price || 0
  const porcentajeDescuento = item.discount_percentage || 0
  const precioDescuento = precio - precio * (porcentajeDescuento / 100)
  return (
    <Link href={`/products/${item.name}`} className="flex items-center gap-3 py-2">
      <div className="bg-secondary h-[70px] w-[70px] flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.images[0] || '/placeholder.svg'}
          alt={item.name}
          width={70}
          height={70}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium">{item.name}</h3>
        <p className="text-muted-foreground text-sm">Cantidad: {item.quantity}</p>

        <Button
          variant="ghost"
          // size="icon"
          className="mt-1 flex w-auto cursor-pointer items-center gap-2 !bg-transparent !p-0 hover:underline hover:underline-offset-4"
          onClick={(e) => {
            e.preventDefault()
            removeItem(item.id)
          }}
        >
          <Trash2 className="h-4 w-4" />

          <span className="text-sm">Eliminar</span>
        </Button>
      </div>

      <div className="flex flex-col items-end">
        {porcentajeDescuento != 0 && (
          <span className="text-muted-foreground text-xs line-through">
            {formatPricePEN(item.price)}
          </span>
        )}
        <span className="text-sm font-medium text-blue-600">{formatPricePEN(precioDescuento)}</span>
      </div>
    </Link>
  )
}
