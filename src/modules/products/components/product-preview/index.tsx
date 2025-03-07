import CustomizeLink from '@/common/components/CustomizeLink'
import Thumbnail from '../thumbnail'
import PreviewPrice from './price'
import { getProductPrice } from '@/lib/utils/get-product-price'
import { Product } from '../../type/product'

export default async function ProductPreview({
  product
}: {
  product: Product
  isFeatured?: boolean
}) {
  const { cheapestPrice } = getProductPrice({
    product
  })

  return (
    <CustomizeLink href={`products`} className="group">
      <div>
        <Thumbnail images={product.images} size="square" />
        <div className="txt-compact-medium mt-4 flex justify-between">
          <div className="text-ui-fg-subtle">{product.name}</div>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </CustomizeLink>
  )
}
