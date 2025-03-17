import { ShoppingBag } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative">
        <div className="border-t-primary border-r-primary border-b-primary/30 border-l-primary/30 animate-spin rounded-full border-4" />

        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className="text-primary size-20 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
