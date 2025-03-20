import { Metadata } from 'next'
import CardProduct from 'raiz/src/common/components/cardProduct/CardProduct'

import SkeletonProductGrid from 'raiz/src/common/components/skeletons/templates/skeleton-product-grid'
import { mockProducts } from 'raiz/src/common/data/dataTest'
import { Suspense } from 'react'
import { ArrowDown, ArrowUp, ShoppingBag } from 'lucide-react'
import { Product } from 'raiz/src/modules/products/type/product'

export const metadata: Metadata = {
  title: 'Store',
  description: 'Explore all of our products.'
}

export default async function StorePage() {
  const filters = [
    { label: 'Precio menor', value: 'asc', icon: <ArrowDown size={16} /> },
    { label: 'Precio mayor', value: 'desc', icon: <ArrowUp size={16} /> }
  ]
  return (
    <div className="container mx-auto flex flex-col py-16 md:flex-row md:items-start">
      <div className="w-full max-w-[250px]">
        <div className="space-y-3">
          <h3 className="font-medium text-gray-800">Ordenar por:</h3>
          <ul className="space-y-2">
            <li className="flex cursor-pointer items-center gap-2 text-sm text-gray-800 hover:underline hover:underline-offset-4">
              {' '}
              <ShoppingBag size={16} />
              Todos los productos
            </li>
            {filters.map((filter) => (
              <li
                key={filter.value}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-800 hover:underline hover:underline-offset-4"
              >
                {filter.icon} {filter.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1 className="text-2xl font-medium">Todos los productos(6)</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-24 md:grid-cols-3 md:gap-y-16">
            {mockProducts.map((product: Product) => (
              <li key={product.id}>
                <CardProduct product={product} isFeatured />
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
    </div>
  )
}
