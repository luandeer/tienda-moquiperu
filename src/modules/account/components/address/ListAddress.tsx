'use client'
import { Button } from 'raiz/src/common/components/ui/button'

// interface Address {
//   id: string
//   name: string
//   street: string
//   city: string
//   postalCode: string
//   region: string
//   country: string
// }

// interface AddressItemProps {
//   address: Address
//   onEdit: () => void
//   onRemove: () => void
// }

export default function AddressList() {
  // Desestructuración del objeto `address`

  return (
    <div className="flex aspect-video h-[208px] max-w-[300px] flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-6 text-black">
      <div className="w-full text-sm">
        <p className="font-semibold">alexander reginaldo</p>
        <p>Calle 1ero de mayo mz. B Lt. 2</p>
        <p>Ate</p>
        <p>Municipalidad Metropolitana de Lima, US</p>
        <p>982131232</p>
      </div>
      <div className="mt-2 flex gap-2">
        <Button>Edit</Button>
        <Button variant="destructive">Remove</Button>
      </div>
    </div>
  )
}
