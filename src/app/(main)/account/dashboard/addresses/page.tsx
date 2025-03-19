import { Metadata } from 'next'
import FormAddresses from 'raiz/src/modules/account/components/address/FormAddress'
import AddressList from 'raiz/src/modules/account/components/address/ListAddress'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your Medusa Store profile.'
}

export default async function Addresses() {
  //para ver el loading
  // await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-xl font-medium">Domicilios</h1>
        <p className="text-base-regular">
          Vea y actualice la información de su perfil, incluido su nombre, correo electrónico y
          número de teléfono. También puede actualizar su dirección de facturación o cambiar su
          contraseña.
        </p>

        <div className="flex flex-wrap gap-4">
          <FormAddresses />
          <AddressList />
        </div>
      </div>
    </div>
  )
}
