/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import CardProduct from 'raiz/src/common/components/cardProduct/CardProduct'
import { mockProducts } from 'raiz/src/common/data/dataTest'
import { Product } from 'raiz/src/modules/products/type/product'

export default async function ProductRail({ collection }: { collection: any }) {
  // Usamos mockProducts en lugar de listProducts
  const pricedProducts = mockProducts.filter(
    (product) => product.category === collection.title // Puedes hacer un filtro por categoría, por ejemplo
  )

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-12 md:py-24">
      <div className="mb-8 flex justify-between">
        <div className="text-2xl font-semibold">{collection.title}</div>
        <Link href={`/collections/${collection.handle}`}>Ver todo</Link>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-24 md:grid-cols-3 md:gap-y-36">
        {pricedProducts &&
          pricedProducts.slice(0, 3).map((product: Product) => (
            <li key={product.id}>
              <CardProduct product={product} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
