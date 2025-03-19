/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'raiz/src/common/components/ui/table'

import { ProductVariant } from 'raiz/src/modules/products/type/product'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// Mapeo para renombrar los campos
const fieldLabels: Record<string, string> = {
  images: 'Imágenes del producto',
  variants: 'Variantes',
  createdAt: 'Fecha de Creación',
  updatedAt: 'Fecha de Actualización',
  category: 'Categoría',
  description: 'Descripción',
  name: 'Nombre del producto'
  // Puedes agregar más mapeos según tus necesidades
}

// Arreglo de orden personalizado (modifícalo según la importancia deseada)
const customOrder = [
  'createdAt',
  'updatedAt',
  'name',
  'category',
  'stock',
  'price',
  'description',

  'images',
  'variants',

  'discount_percentage'
]

// Función para obtener las entradas ordenadas según customOrder
const getOrderedEntries = (data: any): [string, any][] => {
  const entries = Object.entries(data)
  return entries.sort(([keyA], [keyB]) => {
    const indexA = customOrder.indexOf(keyA)
    const indexB = customOrder.indexOf(keyB)
    // Si ambos están en customOrder, ordena según su índice
    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    // Si solo uno está definido en customOrder, se pone primero
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    // Si ninguno, se mantiene el orden original
    return 0
  })
}

// Función para determinar el col-span personalizado según el campo
const getColSpan = (key: string): string => {
  if (key === 'description') return 'sm:col-span-2 md:col-span-3 w-full'
  if (key === 'images' || key === 'variants') return 'sm:col-span-2'
  if (key === 'category') return 'sm:col-span-1'
  return ''
}

/**
 * Componente para mostrar los detalles de un objeto de forma compacta y eficiente.
 * Se utiliza un grid para distribuir las tarjetas de información con distintos spans y se aplica un orden personalizado.
 */
const DetailedInfo = ({ data }: { data: any }) => {
  if (data === null || data === undefined) {
    return <span className="text-gray-500">N/A</span>
  }

  // Si el dato es primitivo, se muestra directamente.
  if (typeof data !== 'object') {
    return <span>{String(data)}</span>
  }

  // Excluir ciertos campos, por ejemplo "id"
  const excludedKeys = ['id']
  const orderedEntries = getOrderedEntries(data).filter(([key]) => !excludedKeys.includes(key))

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      {orderedEntries.map(([key, value]) => {
        const label = fieldLabels[key] || key
        const colSpanClass = getColSpan(key)

        // Caso especial para imágenes...
        if (key === 'images' && Array.isArray(value)) {
          return (
            <div key={key} className={`${colSpanClass}`}>
              <div className="mb-1 text-xs font-semibold text-gray-700">{label}</div>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {value.map((imgUrl: string, index: number) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Imagen ${index + 1}`}
                    className="h-24 w-full rounded-md border object-cover"
                  />
                ))}
              </div>
            </div>
          )
        }

        // Caso especial para variantes...
        if (key === 'variants' && Array.isArray(value)) {
          return (
            <div key={key} className={`${colSpanClass}`}>
              <div className="mb-1 text-xs font-semibold text-gray-700">{label}</div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {value.map((variant: ProductVariant) => (
                  <div key={variant.id} className="rounded-md border bg-white p-2 shadow-sm">
                    <div className="flex items-center gap-2">
                      {variant.image && (
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="h-12 w-12 rounded-md border object-cover"
                        />
                      )}
                      <div>
                        <div className="text-xs font-bold text-gray-800">{variant.name}</div>
                        <div className="text-[10px] text-gray-600">SKU: {variant.sku}</div>
                      </div>
                    </div>
                    <div className="mt-1 text-[10px] text-gray-700">
                      <div>Precio: ${variant.price.toFixed(2)}</div>
                      <div>Stock: {variant.stock}</div>
                      {variant.discount_percentage !== undefined && (
                        <div>Desc: {variant.discount_percentage}%</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        // Caso especial para fechas (createdAt y updatedAt)
        if (key === 'createdAt' || key === 'updatedAt') {
          const date = new Date(value as string)
          const formatted = new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }).format(date)
          return (
            <div key={key} className={`rounded-md border bg-white p-2 shadow-sm ${colSpanClass}`}>
              <div className="text-xs font-semibold text-gray-700">{label}</div>
              <div className="mt-1 text-[10px] text-gray-600">{formatted}</div>
            </div>
          )
        }

        // Valor por defecto: se muestra en una tarjeta compacta.
        return (
          <div key={key} className={`rounded-md border bg-white p-2 shadow-sm ${colSpanClass}`}>
            <div className="text-xs font-semibold text-gray-700">{label}</div>
            <div className="mt-1 text-[10px] text-gray-600">
              {typeof value === 'object' ? <DetailedInfo data={value} /> : String(value)}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: () => true,
    filterFromLeafRows: true,
    maxLeafRowFilterDepth: 1
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        {/* Cabecera de la tabla */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Cuerpo de la tabla */}
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                {/* Fila principal: expandible con efecto hover */}
                <TableRow
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => row.toggleExpanded()}
                  className="cursor-pointer transition-colors hover:bg-gray-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Fila expandida: muestra detalles con UI optimizada */}
                {row.getIsExpanded() && (
                  <TableRow key={`${row.id}-expanded`}>
                    <TableCell colSpan={columns.length} className="bg-gray-100">
                      <DetailedInfo data={row.original} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
