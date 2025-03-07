import CustomizeLink from '@/common/components/CustomizeLink'
import { ShoppingBag } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="border-ui-border-base relative h-[75vh] w-full border-b">
      <div className="absolute inset-0 bg-black/45"></div>
      <div className="small:p-32 absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 text-center">
        <div className="mb-2 space-y-4">
          <h1 className="text-5xl leading-10 font-bold text-white uppercase">
            Repuestos para Maquinaria Pesada
          </h1>
          <p className="mx-auto max-w-2xl text-lg !leading-snug text-gray-200 md:text-xl">
            Todo lo que necesitas para mantener tu equipo funcionando. Calidad garantizada y envío
            rápido.
          </p>
        </div>
        <CustomizeLink
          href="store"
          className="flex h-12 items-center gap-2 rounded-2xl border-transparent bg-[#F08241] px-4 text-base font-medium text-white shadow-none hover:bg-[#F08241]"
          data-testid={`store-link`}
        >
          Ver productos
          <ShoppingBag />
        </CustomizeLink>
      </div>
      <Image
        src="/banner4.jpg"
        alt=""
        className="h-full w-full object-cover object-bottom"
        width={1000}
        height={1000}
      />
    </div>
  )
}

export default Hero
