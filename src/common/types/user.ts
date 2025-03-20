import { Address } from './address'

export type UserRole = 'user' | 'admin'

export type User = {
  id: number
  name?: string
  phone: string
  email: string
  role: UserRole
  photo_url?: string
  defaultAddressId?: string
}

/** 🟢 Crear un usuario (No tiene ID porque aún no se guarda) */
export type CreateUserForm = Omit<User, 'id'> & { password: string }

/** 🔵 Edición para usuario normal (no cambia `role`) */
export type UserEditForm = Omit<User, 'role'> & { password?: string }

/** 🔴 Edición para administrador (puede cambiar `role`) */
export type AdminEditForm = User & { password?: string }

export interface UserWithAddresses extends User {
  addresses: Address[] // Todas las direcciones del usuario
}
