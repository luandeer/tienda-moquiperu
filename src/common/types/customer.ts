import { Address } from './address'

export interface Customer {
  id: string
  has_account: boolean
  email: string
  first_name: string
  last_name: string
  phone: string
  document_type?: 'DNI' | 'RUC' | 'Carnet de Extranjería'
  document_number: string
  addresses: Address[]
  created_at: string
  updated_at: string
}
