import Image from 'next/image'
import { auth } from 'raiz/auth'
import CartMini from 'raiz/src/modules/cart/components/CartMini'
import CustomizeLink from '../CustomizeLink'
import SideMenu from '../side-menu/SideMenu'
import { UserDropdownMenu } from './ProfileTop'

export default async function Header() {
  const session = await auth()
  console.log('usersss:', session?.user)
  const isAuthenticated = !!session?.user
  // if (session?.user) return null

  return (
    <div className="group sticky inset-x-0 top-0 z-50">
      <header className="relative mx-auto h-16 bg-[#030F27] shadow-lg duration-200">
        <nav className="container mx-auto flex h-full w-full items-center justify-between">
          <div className="flex h-full flex-1 basis-0 items-center">
            <div className="h-full">
              <SideMenu />
            </div>
          </div>

          <div className="flex h-full items-center">
            <CustomizeLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              <Image
                src="/logo-blanco.png"
                width={100}
                height={100}
                className="w-auto object-cover"
                alt=""
              />
            </CustomizeLink>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-1">
            {isAuthenticated && (
              <div className="flex h-full items-center gap-x-6">
                <UserDropdownMenu usuario={session?.user} />
              </div>
            )}

            {!isAuthenticated && (
              <div className="flex h-full items-center">
                <CustomizeLink
                  className="text-sm font-semibold text-white hover:underline hover:underline-offset-4"
                  href="account/login"
                >
                  Ingresar
                </CustomizeLink>
              </div>
            )}

            <CartMini />
            {/* <Suspense
              fallback={
                <CustomizeLink
                  className="hover:text-ui-fg-base flex gap-2 !text-white"
                  href="/cart"
                >
                  Cart (0)
                </CustomizeLink>
              }
            >
              cart
            
            </Suspense> */}
          </div>
        </nav>
      </header>
    </div>
  )
}
