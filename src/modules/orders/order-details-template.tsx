/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import CustomizeLink from 'raiz/src/common/components/CustomizeLink'
import React from 'react'
import OrderDetails from './components/order-details'
import Items from './components/items'
import ShippingDetails from './components/shipping-details'
import OrderSummary from './components/order-summary'
import { Undo2 } from 'lucide-react'

const OrderDetailsTemplate: React.FC<any> = () => {
  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-medium">Detalle del pedido</h1>
        <CustomizeLink
          href="account/dashboard/orders"
          className="text-ui-fg-subtle hover:text-ui-fg-base flex items-center gap-2 hover:underline hover:underline-offset-4"
          data-testid="back-to-overview-button"
        >
          <Undo2 className="size-5" />
          Volver
        </CustomizeLink>
      </div>
      <div
        className="flex h-full w-full flex-col gap-4 bg-white"
        data-testid="order-details-container"
      >
        <OrderDetails />
        <Items />
        <ShippingDetails />
        <OrderSummary />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
