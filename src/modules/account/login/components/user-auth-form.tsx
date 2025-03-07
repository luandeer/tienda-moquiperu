'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Login } from '../actions/login'
import { LoginSchema } from '../schemas'
import { FormError } from './form-error'
import { FormSuccess } from './form-exitoso'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'raiz/src/common/components/ui/form'
import { Input } from 'raiz/src/common/components/ui/input'
import { Button } from 'raiz/src/common/components/ui/button'

type ProductFormValues = z.infer<typeof LoginSchema>

export function UserAuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  // const router = useRouter();
  // const { status } = useSession();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      passwords: ''
    }
  })

  // useEffect(() => {
  // 	if (status === 'authenticated') {
  // 		// Redirige a '/usuarios' si ya está autenticado
  // 		router.replace('/usuarios');
  // 		router.refresh();
  // 	}
  // }, [status, router]);

  // // Retorna null si está autenticado para evitar mostrar el formulario
  // if (status === 'authenticated') {
  // 	return null;
  // }

  const onSubmit = async (data: ProductFormValues) => {
    setError('')
    setSuccess('')

    setLoading(() => {
      Login(data)
        .then((values) => {
          if (values?.error) {
            setError(values.error)
          }

          if (values?.success) {
            setSuccess(values.success)
            window.location.replace('/')
          }
        })
        .catch(() => setError('algun problema ocurrió'))
    })
  }

  return (
    <div className="mx-auto grid max-w-sm gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full font-mono">
          <div className="grid gap-2">
            <div className="mb-6 grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email o Celular</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={loading}
                        placeholder="name@example.com o 9991"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name}>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id={field.name}
                          type={showPassword ? 'text' : 'password'}
                          disabled={loading}
                          placeholder="********"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-0 right-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={!field.value}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Iniciar Sesión
              </Button>
            ) : (
              <Button type="submit">
                <LogIn className="h-5 w-5" />
                Iniciar Sesión
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
