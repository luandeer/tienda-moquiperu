import { Metadata } from 'next'
import { auth } from 'raiz/auth'
import { ModalFormProfile } from 'raiz/src/modules/account/components/profile/ModalFormProfile'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your Medusa Store profile.'
}

export default async function Profile() {
  const session = await auth()

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-xl font-medium">Perfil</h1>
        <p className="text-base-regular">
          Vea y actualice la información de su perfil, incluido su nombre, correo electrónico y
          número de teléfono. También puede actualizar su dirección de facturación o cambiar su
          contraseña.
        </p>
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-medium text-gray-700 uppercase">Nombre</h2>
              <span className="text-sm">{session?.user?.name}</span>
            </div>

            <div>
              <ModalFormProfile />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-700 uppercase">Correo Electrónico</h2>
            <span className="text-sm">{session?.user?.email}</span>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-700 uppercase">Celular</h2>
            <span className="text-sm">975656566</span>
          </div>
        </div>
      </div>
    </div>
  )
}
