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
        <div className="text-xl-semi mb-4 flex items-center justify-between">
          <span data-testid="welcome-message" data-value={customer?.first_name}>
            Hola {customer?.first_name}
          </span>
          <span className="text-small-regular text-ui-fg-base">
            Inició sesión como:{' '}
            <span
              className="font-semibold"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col border-t border-gray-200 py-8">
          <div className="col-span-1 row-span-2 flex h-full flex-1 flex-col gap-y-4">
            <div className="mb-6 flex items-start gap-x-16">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Perfil</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="text-base-regular text-ui-fg-subtle uppercase">Completado</span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Dirección</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="text-base-regular text-ui-fg-subtle uppercase">Guardado</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">Ordenes Recientes</h3>
              </div>
              <ul className="flex flex-col gap-y-4" data-testid="orders-wrapper">
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id} data-testid="order-wrapper" data-value={order.id}>
                        <CustomizeLink href={`account/orders/details/${order.id}`}>
                          <div className="flex items-center justify-between bg-gray-50 p-4">
                            <div className="text-small-regular grid flex-1 grid-cols-3 grid-rows-2 gap-x-4">
                              <span className="font-semibold">Fecha de colocación</span>
                              <span className="font-semibold">Número de orden</span>
                              <span className="font-semibold">Importe total</span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span data-testid="order-id" data-value={order.display_id}>
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.summary.total,
                                  currency_code: order.currency_code
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">Ir a la orden #{order.display_id}</span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </div>
                        </CustomizeLink>
                      </li>
                    )
                  })
                ) : (
                  <span data-testid="no-orders-message">No hay ordenes recientes.</span>
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
