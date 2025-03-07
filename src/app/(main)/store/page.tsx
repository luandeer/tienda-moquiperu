import { Metadata } from 'next'

import SkeletonProductGrid from 'raiz/src/common/components/skeletons/templates/skeleton-product-grid'
import { mockProducts } from 'raiz/src/common/data/dataTest'
import { Product } from 'raiz/src/common/types/product'
import ProductPreview from 'raiz/src/modules/products/components/product-preview'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Store',
  description: 'Explore all of our products.'
}

export default async function StorePage() {
  return (
    <div className="content-container container mx-auto flex flex-col py-6 md:flex-row md:items-start">
      <div className="w-full max-w-[250px]">
        <p>Ordenar por:</p>
        <ul>
          <li>Precio menor</li>
          <li>Precio mayor</li>
        </ul>
      </div>
      <div className="w-full">
        <div className="text-2xl-semi mb-8">
          <h1 data-testid="store-page-title">Todos los productos</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-24 md:grid-cols-3 md:gap-y-36">
            {mockProducts.map((product: Product) => (
              <li key={product.id}>
                <ProductPreview product={product} isFeatured />
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
    </div>
  )
}
