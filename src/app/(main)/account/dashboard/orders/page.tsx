import { ChevronDown } from 'lucide-react'
import { Metadata } from 'next'
import CustomizeLink from 'raiz/src/common/components/CustomizeLink'
import { convertToLocale } from 'raiz/src/lib/utils/money'

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Overview of your previous orders.'
}

export default async function Orders() {
  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-xl font-medium">Órdenes</h1>
        <p className="text-base">
          Consulta tus pedidos anteriores y su estado. También puedes crear devoluciones o cambios
          para tus pedidos si es necesario.
        </p>

        <CustomizeLink href={`account/dashboard/orders/details/123`}>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-x-4 text-sm">
              <span className="font-semibold">Fecha de colocación</span>
              <span className="font-semibold">Número de orden</span>
              <span className="font-semibold">Importe total</span>
              <span data-testid="order-created-date">12 de abril</span>
              <span>#1001</span>
              <span>
                {convertToLocale({
                  amount: 10,
                  currency_code: 'PEN'
                })}
              </span>
            </div>
            <button className="flex items-center justify-between">
              <span className="sr-only">Ir a la orden #1001</span>
              <ChevronDown className="-rotate-90" />
            </button>
          </div>
        </CustomizeLink>
      </div>
    </div>
  )
}
