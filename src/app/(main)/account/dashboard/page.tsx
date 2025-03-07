import { notFound } from 'next/navigation'

import Overview from 'raiz/src/modules/account/login/components/overview'
import { customer4, orderWithVariants } from 'raiz/src/common/data/dataTest'

export default async function OverviewPage() {
  if (!customer4) {
    notFound()
  }

  return <Overview customer={customer4} orders={orderWithVariants} />
}
