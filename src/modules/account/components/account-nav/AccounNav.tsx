'use client'
import { ActiveLinks } from './ActiveLinks'
import { LayoutDashboard, ListChecks, MapPin, Package, ShoppingBasket, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

export const AccountNavLinks = () => {
  const pathname = usePathname()
  const links = [
    {
      name: 'Vista General',
      href: '/account/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Perfil',
      href: '/account/dashboard/profile',
      icon: User
    },
    {
      name: 'Direccion',
      href: '/account/dashboard/addresses',
      icon: MapPin
    },
    {
      name: 'Órdernes',
      href: '/account/dashboard/orders',
      icon: Package,
      isActive: pathname.includes('/account/dashboard/orders')
    },
    {
      name: 'Productos',
      href: '/account/dashboard/products',
      icon: ShoppingBasket,
      isActive: pathname.includes('/account/dashboard/products')
    },
    {
      name: 'Ordenes Admin',
      href: '/account/dashboard/admin-orders',
      icon: ListChecks,
      isActive: pathname.includes('/account/dashboard/admin-orders')
    }
  ]
  return (
    <div className="flex w-full max-w-[160px] flex-col gap-2">
      {links.map((link) => {
        return <ActiveLinks key={link.name} {...link} />
      })}
    </div>
  )
}
