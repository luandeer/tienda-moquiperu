import { Metadata } from 'next'
import { columnsOrdersAdmin } from './columns'
import { DataTableOrderAdmin } from './data-table'
import { mockProducts } from 'raiz/src/common/data/dataTest'
export const metadata: Metadata = {
  title: 'Orders',
  description: 'Overview of your previous orders.'
}

export default async function OrdersAdmin() {
  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between gap-6">
          <div className="w-full">
            <h1 className="text-xl font-medium">Órdenes Recientes</h1>
            <p className="text-base">
              Consulta las órdenes de tus clientes. También puedes crear devoluciones o cambios para
              tus pedidos si es necesario.
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <DataTableOrderAdmin columns={columnsOrdersAdmin} data={mockProducts} />
        </div>
      </div>
    </div>
  )
}
