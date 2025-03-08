import { Metadata } from 'next'

import { getBaseURL } from '@/lib/utils/env'
import { auth } from 'raiz/auth'
import { redirect } from 'next/navigation'
import { AccountNavLinks } from 'raiz/src/modules/account/components/account-nav/AccounNav'

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL())
}

export default async function PageDashboard(props: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/account/login')
  }
  return (
    <div className="mx-auto flex max-w-4xl items-start gap-10 py-20">
      <AccountNavLinks />
      <div className="w-full">{props.children}</div>
    </div>
  )
}
