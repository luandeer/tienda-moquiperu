import { cn } from '@/lib/utils'

export default function PreviewPrice({
  price
}: {
  price: { originalPrice: string; finalPrice: string; discountPercentage?: number } | null
}) {
  if (!price) {
    return null
  }

  const { originalPrice, finalPrice, discountPercentage } = price
  const isOnSale = !!discountPercentage && discountPercentage > 0

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1">
        {isOnSale && originalPrice !== finalPrice && (
          <div className="text-ui-fg-muted line-through">{originalPrice}</div>
        )}
        {isOnSale && (
          <div className="text-xs font-semibold text-red-500">-{discountPercentage}%</div>
        )}
      </div>
      <div
        className={cn('text-ui-fg-muted font-semibold', {
          'text-ui-fg-interactive': isOnSale
        })}
      >
        {finalPrice}
      </div>
    </div>
  )
}
