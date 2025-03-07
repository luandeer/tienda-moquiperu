import Hero from '@/modules/home/components/Hero'
import { Metadata } from 'next'
import FeaturedProducts from 'raiz/src/modules/home/components/featured-products'

export const metadata: Metadata = {
  title: 'Medusa Next.js Starter Template',
  description: 'A performant frontend ecommerce starter template with Next.js 15 and Medusa.'
}

export default async function Home() {
  // Simulación de colecciones simplificadas para el frontend
  const collections = [
    {
      id: '1',
      title: 'Ropa',
      handle: 'ropa'
    }
  ]

  // Usar la colección en FeaturedProducts

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="container mx-auto flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} />
        </ul>
      </div>
    </>
  )
}
