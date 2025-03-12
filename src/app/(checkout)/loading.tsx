import { ShoppingBag } from 'lucide-react'

export default function LoadingCheckout() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div className="border-t-primary border-r-primary border-b-primary/30 border-l-primary/30 animate-spin rounded-full border-4" />

        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag className="text-primary animate-pulse" />
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-center font-medium">
        Cargando tu experiencia de compra...
      </p>
    </div>
  )
}
