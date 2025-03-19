/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown } from 'lucide-react'
import CustomizeLink from 'raiz/src/common/components/CustomizeLink'
import { Customer } from 'raiz/src/common/types/customer'
import { Order } from 'raiz/src/common/types/order'
import { convertToLocale } from 'raiz/src/lib/utils/money'

type OverviewProps = {
  customer: Customer | null
  orders: Order[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div>
      <div>
        <div className="text-xl-semi mb-4 flex w-full items-center justify-between">
          <span className="text-xl font-medium" data-value={customer?.first_name}>
            Hola {customer?.first_name}!
          </span>
          <span className="text-sm">
            Ingresaste como:{' '}
            <span className="font-semibold" data-value={customer?.email}>
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col border-t border-gray-200 py-8">
          <div className="col-span-1 row-span-2 flex h-full flex-1 flex-col gap-y-4">
            <div className="mb-6 flex items-start gap-x-16">
              <div className="flex flex-col gap-y-4">
                <h3 className="font-medium">Perfil</h3>
                <div className="flex items-end gap-x-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <span
                    className="text-3xl leading-none font-semibold"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="text-sm text-gray-800 uppercase">Completado</span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="font-medium">Dirección</h3>
                <div className="flex items-end gap-x-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <span
                    className="text-3xl leading-none font-semibold"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="text-sm text-gray-800 uppercase">Guardado</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="font-medium">Ordenes Recientes</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id} data-testid="order-wrapper" data-value={order.id}>
                        <CustomizeLink href={`account/dashboard/orders/details/${order.id}`}>
                          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-x-4 text-sm">
                              <span className="font-semibold">Fecha de colocación</span>
                              <span className="font-semibold">Número de orden</span>
                              <span className="font-semibold">Importe total</span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span data-value={order.display_id}>#{order.display_id}</span>
                              <span>
                                {convertToLocale({
                                  amount: order.summary.total,
                                  currency_code: order.currency_code
                                })}
                              </span>
                            </div>
                            <button className="flex items-center justify-between">
                              <span className="sr-only">Ir a la orden #{order.display_id}</span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </div>
                        </CustomizeLink>
                      </li>
                    )
                  })
                ) : (
                  <span>No hay ordenes recientes.</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: any | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find((addr: any) => addr.is_default_billing)

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
