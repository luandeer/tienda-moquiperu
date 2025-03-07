import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your Medusa Store profile.'
}

export default async function Profile() {
  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Perfil</h1>
        <p className="text-base-regular">
          Vea y actualice la información de su perfil, incluido su nombre, correo electrónico y
          número de teléfono. También puede actualizar su dirección de facturación o cambiar su
          contraseña.
        </p>
      </div>
    </div>
  )
}
