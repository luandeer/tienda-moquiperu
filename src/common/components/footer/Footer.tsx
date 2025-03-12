import Image from 'next/image'
import CustomizeLink from '../CustomizeLink'
import { cn } from '@/lib/utils'

export default async function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#030F27]">
      <Image
        src="/adorno-footer.png"
        alt=""
        className="pointer-events-none absolute -top-10 right-20 h-full w-[200px] object-cover lg:w-[800px]"
        width={400}
        height={400}
      />
      <div className="container mx-auto flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-6 py-40 sm:flex-row">
          <div className="flex flex-col gap-4">
            <CustomizeLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              <Image
                src="/logo-blanco.png"
                width={150}
                height={150}
                className="w-auto object-cover"
                alt=""
              />
            </CustomizeLink>
            <p className="max-w-[400px] text-white">
              Empresa con más de 28 años de experiencia en la venta de maquinaria pesada, logística
              y agrícola. Dealer Oficial de Hyundai, Yale, Sonalika y Shacman.
            </p>
          </div>
          <div className="text-small-regular grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-x-16">
            <div className="flex flex-col gap-y-2">
              <span className="text-sm font-medium text-white">Marcas</span>
              <ul className="grid grid-cols-1 gap-2 text-sm" data-testid="footer-categories">
                <li className="text-ui-fg-subtle flex flex-col gap-2">
                  <CustomizeLink
                    className={cn('text-gray-400 hover:text-gray-50')}
                    href={`#`}
                    data-testid="category-link"
                  >
                    Hyundai
                  </CustomizeLink>
                  {/* <ul className="ml-3 grid grid-cols-1 gap-2">
                    <li>
                      <CustomizeLink
                        className="text-gray-400 hover:text-gray-50"
                        href={`/categories/`}
                        data-testid="category-link"
                      >
                        asdsads
                      </CustomizeLink>
                    </li>
                  </ul> */}
                </li>
                <li className="text-ui-fg-subtle txt-small flex flex-col gap-2">
                  <CustomizeLink
                    className={cn('text-gray-400 hover:text-gray-50')}
                    href={`#`}
                    data-testid="category-link"
                  >
                    Yale
                  </CustomizeLink>
                </li>
                <li className="text-ui-fg-subtle txt-small flex flex-col gap-2">
                  <CustomizeLink
                    className={cn('text-gray-400 hover:text-gray-50')}
                    href={`#`}
                    data-testid="category-link"
                  >
                    Sonalika
                  </CustomizeLink>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-sm font-medium text-white">Colecciones</span>
              <ul className={cn('text-ui-fg-subtle grid grid-cols-1 gap-2 text-sm')}>
                <li>
                  <CustomizeLink className="text-gray-400 hover:text-gray-50" href={`#`}>
                    Últimas llegadas{' '}
                  </CustomizeLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-16 flex w-full justify-between text-gray-400">
          <div className="txt-compact-small">
            © {new Date().getFullYear()} Tienda MAQUIPERU. Reservados todos los derechos.
          </div>
          <span> Desarrollado con ❤️</span>
        </div>
      </div>
    </footer>
  )
}
