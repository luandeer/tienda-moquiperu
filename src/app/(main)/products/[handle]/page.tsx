import ProductView from 'raiz/src/modules/product/ProductView'

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
}

export default async function ProductPage(props: Props) {
  const params = await props.params

  return <ProductView productHandle={params.handle} />
}
