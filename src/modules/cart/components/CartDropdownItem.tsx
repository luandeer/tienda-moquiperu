'use client'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/common/components/ui/button'
import { formatPricePEN } from '@/lib/utils'
import useCartStore, { CartItem } from '@/store/useCartStore'

export default function CartDropdownItem({ item }: { item: CartItem }) {
  const { removeItem } = useCartStore()

  return (
    <div className="flex gap-3 py-2">
      <div className="bg-secondary h-[70px] w-[70px] flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.images[0] || '/placeholder.svg'}
          alt={item.name}
          width={70}
          height={70}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium">{item.name}</h3>
        <p className="text-muted-foreground text-sm">Variant: {item.variant}</p>
        <p className="text-muted-foreground text-sm">Quantity: {item.quantity}</p>

        <Button
          variant="ghost"
          // size="icon"
          className="mt-1 flex w-auto cursor-pointer items-center gap-2"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />

          <span className="text-sm">Remove</span>
        </Button>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-muted-foreground text-sm line-through">
          {formatPricePEN(item.originalPrice)}
        </span>
        <span className="font-medium text-blue-600">{formatPricePEN(item.price)}</span>
      </div>
    </div>
  )
}
