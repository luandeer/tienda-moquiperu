import CustomizeLink from '@/common/components/CustomizeLink'
import { getProductPrice } from '@/lib/utils/get-product-price'
import { Product } from '../../types/product'
import Thumbnail from './components/Thumbnail'
import PreviewPrice from './components/PreviewPrice'

export default async function CardProduct({ product }: { product: Product; isFeatured?: boolean }) {
  const { cheapestPrice } = getProductPrice({
    product
  })

  return (
    <CustomizeLink href={`products/${product.name}`} className="group">
      <div>
        <Thumbnail images={product.images} size="square" />
        <div className="txt-compact-medium mt-4 flex items-center justify-between">
          <div className="text-ui-fg-subtle">{product.name}</div>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </CustomizeLink>
  )
}
