'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ChevronRight, Edit, Trash } from 'lucide-react'
import { Product } from 'raiz/src/modules/products/type/product'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'expander',
    header: () => null, // Sin título en el encabezado
    cell: ({ row }) => (
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          // Evita que el clic se propague a la fila (si ya tienes onClick en la fila)
          e.stopPropagation()
          row.getToggleExpandedHandler()()
        }}
        className={`inline-block transition-transform duration-200 ${
          row.getIsExpanded() ? 'rotate-90' : ''
        }`}
      >
        <ChevronRight size={16} className="text-blue-500" />
      </span>
    ),
    enableSorting: false // Esta columna no participa en el ordenamiento
  },
  {
    header: 'Creado',
    cell: ({ row }) => {
      const product: Product = row.original
      const date = new Date(product.createdAt)
      // Formateamos la fecha en formato dd/MM/yyyy
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
    }
  },
  {
    accessorKey: 'name',
    header: 'Nombre'
  },

  {
    accessorKey: 'category',
    header: 'Categoría'
  },
  {
    header: 'Precio',
    cell: ({ row }) => {
      const product: Product = row.original

      // Si el producto tiene variantes, calculamos el rango de precios
      if (product.variants && product.variants.length > 0) {
        const prices = product.variants.map((v) => v.price)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        return minPrice === maxPrice
          ? `S/${minPrice.toFixed(2)}`
          : `S/${minPrice.toFixed(2)} - S/${maxPrice.toFixed(2)}`
      }
      // Si no tiene variantes, mostramos el precio único (si está definido)
      if (product.price !== undefined) {
        return `S/${product.price.toFixed(2)}`
      }
      return '-'
    }
  },

  {
    id: 'actions',
    header: () => null, // Sin título en el encabezado
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            // Lógica para editar el producto
            console.log('Editar', row.original)
          }}
          className="text-blue-500 hover:text-blue-600"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            // Lógica para eliminar el producto
            console.log('Eliminar', row.original)
          }}
          className="text-red-500 hover:text-red-600"
        >
          <Trash size={16} />
        </button>
      </div>
    ),
    enableSorting: false // Esta columna no participa en el ordenamiento
  }
]
