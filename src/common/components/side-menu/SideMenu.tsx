'use client'

import Image from 'next/image'
import CustomizeLink from '../CustomizeLink'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet'

const SideMenuItems = {
  Inicio: '',
  Tienda: 'store',
  Carrito: 'cart'
}

const SideMenu = () => {
  return (
    <div className="h-full">
      <div className="flex h-full items-center">
        <Sheet>
          <SheetTrigger className="cursor-pointer text-white">Menu</SheetTrigger>
          <SheetContent side="left" className="border-none bg-[#F08241]">
            <div className="rounded-rounded flex h-full flex-col justify-between p-6">
              <SheetHeader className="p-0">
                <SheetTitle className="pointer-events-none">
                  <Image
                    src="/logo-blanco.png"
                    width={150}
                    height={150}
                    className="w-auto object-cover"
                    alt=""
                  />
                </SheetTitle>
                <SheetDescription className="hidden">Explora nuestras secciones </SheetDescription>
              </SheetHeader>
              <ul className="flex flex-col items-start justify-start gap-6">
                {Object.entries(SideMenuItems).map(([name, href]) => {
                  return (
                    <li key={name}>
                      <SheetTrigger asChild>
                        <CustomizeLink href={href} className="text-3xl leading-10 text-[#030F27]">
                          {name}
                        </CustomizeLink>
                      </SheetTrigger>
                    </li>
                  )
                })}
              </ul>
              <div className="flex items-start gap-2 text-sm text-[#030F27]">
                <svg width="25" height="15" className="w-fit rounded-sm" viewBox="0 0 3 2">
                  <rect width="3" height="2" fill="white" />
                  <rect width="1" height="2" fill="red" />
                  <rect x="2" width="1" height="2" fill="red" />
                </svg>
                © {new Date().getFullYear()} Maquiperú. Todos los derechos son reservados.
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default SideMenu
