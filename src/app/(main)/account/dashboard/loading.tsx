import { Package } from 'lucide-react'

export default function Loading() {
  return (
    <div className="w-full">
      <div className="flex min-h-[300px] w-full flex-col items-center justify-center">
        <div className="relative mb-4">
          <div className="border-muted border-t-primary h-16 w-16 animate-spin rounded-full border-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="text-primary h-6 w-6" />
          </div>
        </div>

        <p className="text-muted-foreground animate-pulse text-sm">Cargando...</p>
      </div>
    </div>
  )
}
