'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { IconProps } from 'raiz/src/common/types/icon'

interface Props {
  name: string
  href: string
  icon?: React.FC<IconProps> // Ahora icon es un componente React
}

export const ActiveLinks = ({ name, href, icon: Icon }: Props) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={clsx(
        'flex h-auto grow items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F08241] hover:text-white md:flex-none md:justify-start',
        { 'bg-[#F08241] text-white hover:bg-[#F08241] hover:text-white': isActive }
      )}
    >
      {/* Renderiza el icono si existe, de lo contrario usa un icono por defecto */}
      {Icon ? <Icon size={20} /> : <></>}
      <p className="hidden md:block">{name}</p>
    </Link>
  )
}
