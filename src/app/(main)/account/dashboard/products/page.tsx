import { Metadata } from 'next'
import { columns } from './columns'
import { DataTable } from './data-table'
import { mockProducts } from 'raiz/src/common/data/dataTest'
export const metadata: Metadata = {
  title: 'Orders',
  description: 'Overview of your previous orders.'
}

export default async function Products() {
  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-xl font-medium">Productos</h1>
        <p className="text-base">
          Consulta tus pedidos anteriores y su estado. También puedes crear devoluciones o cambios
          para tus pedidos si es necesario.
        </p>
        <div className="container mx-auto">
          <DataTable columns={columns} data={mockProducts} />
        </div>
      </div>
    </div>
  )
}
