'use client'
import { ActiveLinks } from './ActiveLinks'
import { LayoutDashboard, MapPin, Package, User } from 'lucide-react'
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
    href: '/Addresses',
    icon: MapPin
  },
  {
    name: 'Órdernes',
    href: '/dudas',
    icon: Package
  }
]
export const AccountNavLinks = () => {
  return (
    <div className="flex flex-col gap-2">
      {links.map((link) => {
        return <ActiveLinks key={link.name} {...link} />
      })}
    </div>
  )
}
