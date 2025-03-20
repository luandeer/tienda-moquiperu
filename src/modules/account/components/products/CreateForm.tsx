/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Label } from 'raiz/src/common/components/ui/label'

import type React from 'react'

import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Plus, Trash2, Upload, ImageIcon, Info, DollarSign, Percent, Edit } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from 'raiz/src/common/components/ui/dialog'
import { Input } from 'raiz/src/common/components/ui/input'
import { Textarea } from 'raiz/src/common/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from 'raiz/src/common/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from 'raiz/src/common/components/ui/card'
import { Badge } from 'raiz/src/common/components/ui/badge'
import { Switch } from 'raiz/src/common/components/ui/switch'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from 'raiz/src/common/components/ui/tooltip'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'raiz/src/common/components/ui/form'

import { Button } from 'raiz/src/common/components/ui/button'
import { Product, ProductVariant } from 'raiz/src/modules/products/type/product'

// Esquema de validación para el producto
const productSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  description: z.string().min(10, { message: 'La descripción debe tener al menos 10 caracteres' }),
  category: z.string().min(1, { message: 'Selecciona una categoría' }),
  sku: z.string().optional(),
  price: z.number().optional(),
  stock: z.number().int().optional(),
  discount_percentage: z.number().min(0).max(100).optional()
})

interface ProductModalProps {
  product?: Product
}

const exampleCategories = [
  'Electrónica',
  'Ropa y Accesorios',
  'Hogar y Jardín',
  'Salud y Belleza',
  'Deportes y Ocio',
  'Juguetes y Juegos',
  'Alimentos y Bebidas',
  'Libros y Oficina',
  'Automóviles y Motocicletas',
  'Mascotas',
  'Arte y Manualidades',
  'Instrumentos Musicales',
  'Viajes y Equipaje',
  'Tecnología',
  'Bebés y Niños',
  'Joyas y Relojes',
  'Zapatos',
  'Bolsos y Carteras',
  'Relojes',
  'Accesorios para Teléfonos',
  'Últimas llegadas'
]
export function CreateProductModal({ product }: ProductModalProps) {
  console.log('asdsadasdsa:', product)
  const isEditing = !!product
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)
  const [dragOverImageIndex, setDragOverImageIndex] = useState<number | null>(null)
  const [hasVariants, setHasVariants] = useState<boolean>(false)
  const [variants, setVariants] = useState<ProductVariant[]>([])

  // Configurar el formulario con react-hook-form y zod
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      sku: '',
      price: 0,
      stock: 0,
      discount_percentage: 0
    }
  })

  // Inicializar el formulario cuando se abre el modal
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        category: product.category,
        sku: product.sku || '',
        price: product.price || 0,
        stock: product.stock || 0,
        discount_percentage: product.discount_percentage || 0
      })
      setImageUrls(product.images || [])
      setHasVariants(!!product.variants && product.variants.length > 0)
      setVariants(product.variants || [])
    } else {
      form.reset({
        name: '',
        description: '',
        category: '',
        sku: '',
        price: 0,
        stock: 0,
        discount_percentage: 0
      })
      setImageUrls([])
      setHasVariants(false)
      setVariants([createEmptyVariant()])
    }
  }, [product, form])

  const createEmptyVariant = (): ProductVariant => ({
    id: Date.now().toString(),
    name: '',
    price: 0,
    stock: 0,
    sku: ''
  })

  const handleSwitchChange = (checked: boolean) => {
    setHasVariants(checked)
    if (!checked) {
      setVariants([])
    } else {
      setVariants([createEmptyVariant()])
    }
  }

  const handleAddVariant = () => {
    setVariants((prev) => [...prev, createEmptyVariant()])
  }

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index))
  }

  const handleVariantChange = (index: number, field: keyof ProductVariant, value: any) => {
    setVariants((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImageUrls = Array.from(files).map((file) => URL.createObjectURL(file))
    setImageUrls((prev) => [...prev, ...newImageUrls])
  }

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragStart = (index: number) => {
    setDraggedImageIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverImageIndex(index)
  }

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedImageIndex === null) return

    const newImageUrls = [...imageUrls]
    const draggedImage = newImageUrls[draggedImageIndex]
    newImageUrls.splice(draggedImageIndex, 1)
    newImageUrls.splice(index, 0, draggedImage)

    setImageUrls(newImageUrls)

    setDraggedImageIndex(null)
    setDragOverImageIndex(null)
  }

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    const updatedProduct: Product = {
      ...data,
      id: product?.id || Date.now().toString(),
      images: imageUrls,
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (hasVariants) {
      updatedProduct.variants = variants
      // Eliminar precio y stock a nivel de producto si hay variantes
      delete updatedProduct.price
      delete updatedProduct.stock
    } else {
      // Asegurar que no hay variantes si hasVariants es false
      delete updatedProduct.variants
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEditing ? (
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex cursor-pointer items-center">
                  <Edit size={16} className="text-blue-500 hover:text-blue-600" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <button className="flex cursor-pointer items-center rounded-lg border px-4 py-1 text-sm">
            Crear
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="h-[80vh] w-full !max-w-5xl sm:max-w-[80vw]">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-2xl font-semibold">
            {isEditing ? 'Editar producto' : 'Crear nuevo producto'}
          </DialogTitle>
          <DialogDescription>
            Complete la información del producto en las siguientes secciones. Los campos marcados
            con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Sección de información general */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info size={18} className="text-primary" />
                    <h2 className="text-lg font-semibold">Información general</h2>
                  </div>
                </div>
                <Card>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del producto *</FormLabel>
                            <FormControl>
                              <Input placeholder="Nombre del producto" {...field} />
                            </FormControl>
                            <FormDescription>Nombre que se mostrará a los clientes</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Categoría *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {exampleCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <FormDescription>
                              Categoría a la que pertenece el producto
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SKU (Código de producto)</FormLabel>
                          <FormControl>
                            <Input placeholder="SKU-12345" {...field} />
                          </FormControl>
                          <FormDescription>
                            Código único para identificar el producto en su inventario
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descripción detallada del producto"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Descripción detallada que ayudará a los clientes a entender el producto
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sección de imágenes */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={18} className="text-primary" />
                    <h2 className="text-lg font-semibold">Imágenes del producto</h2>
                  </div>
                </div>
                <Card>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-sm">
                        {imageUrls.length} {imageUrls.length === 1 ? 'imagen' : 'imágenes'} cargadas
                      </p>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full cursor-pointer opacity-0"
                        />
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload size={16} />
                          <span>Subir imágenes</span>
                        </Button>
                      </div>
                    </div>

                    {imageUrls.length === 0 ? (
                      <div className="rounded-lg border-2 border-dashed p-12 text-center">
                        <div className="mb-4 flex justify-center">
                          <ImageIcon size={48} className="text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground mb-2">No hay imágenes cargadas</p>
                        <p className="text-muted-foreground text-sm">
                          Arrastra y suelta imágenes o haz clic en Subir imágenes
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {imageUrls.map((url, index) => (
                          <div
                            key={index}
                            className={cn(
                              'group relative aspect-square overflow-hidden rounded-lg border transition-all',
                              dragOverImageIndex === index && 'border-primary scale-105 border-2',
                              index === 0 && 'ring-primary ring-2 ring-offset-2'
                            )}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                          >
                            <img
                              src={url || '/placeholder.svg'}
                              alt={`Product image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleRemoveImage(index)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Eliminar imagen</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            {index === 0 && (
                              <Badge className="bg-primary absolute top-2 left-2">Principal</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Info size={14} />
                      Puedes reordenar las imágenes arrastrándolas. La imagen con borde resaltado
                      será la principal.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Sección de precios y variantes */}
              <div className="mb-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-primary" />
                    <h2 className="text-lg font-semibold">Precios y variantes</h2>
                  </div>
                </div>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardDescription>
                        Configure los precios y el inventario de su producto
                      </CardDescription>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="has-variants"
                          checked={hasVariants}
                          onCheckedChange={handleSwitchChange}
                        />
                        <Label htmlFor="has-variants">Este producto tiene variantes</Label>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {!hasVariants ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <DollarSign className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                      type="number"
                                      step="0.01"
                                      placeholder="0.00"
                                      className="pl-9"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number.parseFloat(e.target.value) || 0)
                                      }
                                    />
                                  </div>
                                </FormControl>
                                <FormDescription>Precio de venta del producto</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stock disponible</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(Number.parseInt(e.target.value) || 0)
                                    }
                                  />
                                </FormControl>
                                <FormDescription>Cantidad disponible para venta</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="discount_percentage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Descuento (%)</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      placeholder="0"
                                      {...field}
                                      onChange={(e) =>
                                        field.onChange(Number.parseFloat(e.target.value) || 0)
                                      }
                                    />
                                    <Percent className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                                  </div>
                                </FormControl>
                                <FormDescription>Porcentaje de descuento aplicado</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {variants.map((variant, index) => (
                          <Card key={variant.id} className="border-muted overflow-hidden py-0">
                            <CardHeader className="bg-muted/50 flex flex-row items-center justify-between space-y-0 p-4">
                              <CardTitle className="text-base font-medium">
                                Variante {index + 1}
                              </CardTitle>
                              {variants.length > 1 && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveVariant(index)}
                                    >
                                      <Trash2 size={16} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Eliminar variante</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor={`variant-name-${index}`}>
                                    Nombre de la variante *
                                  </Label>
                                  <Input
                                    id={`variant-name-${index}`}
                                    value={variant.name}
                                    onChange={(e) =>
                                      handleVariantChange(index, 'name', e.target.value)
                                    }
                                    placeholder="Ej: Color Rojo, Talla M, etc."
                                  />
                                  <p className="text-muted-foreground text-xs">
                                    Nombre descriptivo para identificar esta variante
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`variant-sku-${index}`}>SKU</Label>
                                  <Input
                                    id={`variant-sku-${index}`}
                                    value={variant.sku}
                                    onChange={(e) =>
                                      handleVariantChange(index, 'sku', e.target.value)
                                    }
                                    placeholder="SKU-12345-VAR1"
                                  />
                                  <p className="text-muted-foreground text-xs">
                                    Código único para esta variante
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`variant-price-${index}`}>Precio *</Label>
                                  <div className="relative">
                                    <DollarSign className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                      id={`variant-price-${index}`}
                                      type="number"
                                      step="0.01"
                                      value={variant.price}
                                      onChange={(e) =>
                                        handleVariantChange(
                                          index,
                                          'price',
                                          Number.parseFloat(e.target.value) || 0
                                        )
                                      }
                                      placeholder="0.00"
                                      className="pl-9"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`variant-stock-${index}`}>Stock *</Label>
                                  <Input
                                    id={`variant-stock-${index}`}
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) =>
                                      handleVariantChange(
                                        index,
                                        'stock',
                                        Number.parseInt(e.target.value) || 0
                                      )
                                    }
                                    placeholder="0"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`variant-discount-${index}`}>Descuento (%)</Label>
                                  <div className="relative">
                                    <Input
                                      id={`variant-discount-${index}`}
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={variant.discount_percentage || ''}
                                      onChange={(e) =>
                                        handleVariantChange(
                                          index,
                                          'discount_percentage',
                                          Number.parseFloat(e.target.value) || 0
                                        )
                                      }
                                      placeholder="0"
                                    />
                                    <Percent className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor={`variant-image-${index}`}>Imagen (URL)</Label>
                                  <Input
                                    id={`variant-image-${index}`}
                                    value={variant.image || ''}
                                    onChange={(e) =>
                                      handleVariantChange(index, 'image', e.target.value)
                                    }
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                  />
                                  <p className="text-muted-foreground text-xs">
                                    URL de la imagen específica para esta variante
                                  </p>
                                </div>
                              </div>

                              {variant.price > 0 &&
                                variant.discount_percentage &&
                                variant.discount_percentage > 0 && (
                                  <div className="bg-muted mt-4 flex items-center justify-between rounded-lg p-3">
                                    <p className="text-sm">Precio con descuento:</p>
                                    <div className="text-right">
                                      <p className="text-primary text-base font-bold">
                                        $
                                        {(
                                          variant.price *
                                          (1 - (variant.discount_percentage || 0) / 100)
                                        ).toFixed(2)}
                                      </p>
                                      <p className="text-muted-foreground text-sm line-through">
                                        ${variant.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                )}
                            </CardContent>
                          </Card>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          className="flex w-full items-center justify-center gap-2"
                          onClick={handleAddVariant}
                        >
                          <Plus size={16} />
                          <span>Añadir variante</span>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Regresar
            </Button>
          </DialogClose>
          <Button type="submit">{isEditing ? 'Guardar cambios' : 'Crear producto'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
