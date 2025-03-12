'use client'
import { CheckCircle, Circle, Undo2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const steps = [
  { name: 'Dirección', path: '/checkout/shipping' },
  { name: 'Método de Envío', path: '/checkout/delivery' },
  { name: 'Pago', path: '/checkout/payment' },
  { name: 'Revisar', path: '/checkout/review' }
]

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Determina el índice del paso actual
  const currentStepIndex = steps.findIndex((step) => step.path === pathname)

  return (
    <div className="relative w-full md:min-h-screen">
      {/* Navbar */}
      <div className="h-16 border-b bg-[#030F27]">
        <nav className="container mx-auto flex h-full items-center justify-between">
          <Link
            href="/cart"
            className="flex flex-1 basis-0 items-center gap-x-2 text-sm text-white hover:underline hover:underline-offset-4"
          >
            <span>
              <Undo2Icon />
            </span>
            <span className="hidden sm:block">Volver al carrito</span>
          </Link>
          <Link href="/" className="uppercase">
            <Image
              src="/logo-blanco.png"
              width={100}
              height={100}
              className="w-auto object-cover"
              alt="Logo"
            />
          </Link>
          <div className="flex-1 basis-0" />
        </nav>
      </div>

      <div className="container mx-auto flex items-start gap-8 py-10">
        {/* Pasos del Checkout */}
        <div className="w-[70%]">
          <div className="mx-auto mb-6 flex max-w-lg items-center justify-between space-x-4">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex
              const isActive = index === currentStepIndex

              return (
                <Link key={step.name} href={step.path} className="flex items-center gap-x-2">
                  {/* Ícono de paso (completado o no) */}
                  {isCompleted ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : isActive ? (
                    <Circle className="text-blue-500" size={20} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}

                  {/* Texto del paso */}
                  <span
                    className={`text-sm font-semibold ${
                      isCompleted ? 'text-green-500' : isActive ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  >
                    {index + 1}. {step.name}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Contenido dinámico del checkout */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">{children}</div>
        </div>
        {/* Order Summary */}
        <div className="w-[30%] lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <h2 className="text-xl font-semibold">Tu Carrito</h2>

            <div>
              <div className="space-y-4 p-4">
                <div className="flex items-start space-x-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md border">image</div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium">Mochila Premium</h3>
                    <p className="text-sm text-gray-500">Variante: Negro</p>
                    <p className="text-sm font-medium">$99.00</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-medium">$99.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Envío</span>
                    <span className="font-medium">$12321321</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Impuestos</span>
                    <span className="font-medium">$10.00</span>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>$12321</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
