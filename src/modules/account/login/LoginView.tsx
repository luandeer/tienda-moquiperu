import { UserAuthForm } from './components/user-auth-form'

export default function LoginView() {
  return (
    <div className="container mx-auto py-20">
      <h1 className="mb-8 text-center text-xl font-semibold uppercase">Iniciar sesión</h1>
      <UserAuthForm />
    </div>
  )
}
