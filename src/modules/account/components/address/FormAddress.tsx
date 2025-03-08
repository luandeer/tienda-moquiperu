/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'raiz/src/common/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from 'raiz/src/common/components/ui/form'
import { Input } from 'raiz/src/common/components/ui/input'
import { Button } from 'raiz/src/common/components/ui/button'
import { Plus } from 'lucide-react'

const addressSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  city: z.string().min(1, 'La ciudad es obligatoria'),
  address: z.string().min(1, 'La dirección es obligatoria'),
  state: z.string().min(1, 'El estado es obligatorio'),
  phone: z.string().regex(/^\d{9,15}$/, 'El teléfono debe tener entre 9 y 15 dígitos')
})

export default function FormAddress() {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: '',
      city: '',
      address: '',
      state: '',
      phone: ''
    }
  })

  const onSubmit = (values: any) => {
    console.log('Dirección registrada:', values)
    setOpen(false) // Cierra el modal después de guardar
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex size-52 cursor-pointer flex-col items-center justify-center border border-gray-200 bg-gray-50 !p-0 text-black hover:bg-gray-100">
          Nuevo Domicilio
          <Plus className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle>Agregar Dirección</DialogTitle>
          <DialogDescription className="hidden">
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distrito</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Guardar Dirección
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
