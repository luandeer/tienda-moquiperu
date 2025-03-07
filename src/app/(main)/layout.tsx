import { Metadata } from 'next'

import Header from '@/common/components/header/Header'
import { getBaseURL } from '@/lib/utils/env'
import Footer from '@/common/components/footer/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL())
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  // const customer = await retrieveCustomer()
  // const cart = await retrieveCart()
  // let shippingOptions: StoreCartShippingOption[] = []

  // if (cart) {
  //   const { shipping_options } = await listCartOptions()

  //   shippingOptions = shipping_options
  // }

  return (
    <>
      <Header />
      {/* {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )} */}

      {/* {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )} */}
      <main>{props.children}</main>
      <Footer />
    </>
  )
}
