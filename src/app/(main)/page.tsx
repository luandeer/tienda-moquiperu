import Hero from '@/modules/home/components/Hero'
import { Metadata } from 'next'
import FeaturedProducts from 'raiz/src/modules/home/components/featured-products'

export const metadata: Metadata = {
  title: 'MaquiPeru',
  description: 'Venta de repuestos de maquinaria pesada'
}

export default async function Home() {
  // Simulación de colecciones simplificadas para el frontend
  const collections = [
    {
      id: '1',
      title: 'Últimas llegadas',
      handle: 'ropa'
    }
  ]

  // Usar la colección en FeaturedProducts

  return (
    <>
      <Hero />
      <div>
        <ul className="container mx-auto flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} />
        </ul>
      </div>
    </>
  )
}
