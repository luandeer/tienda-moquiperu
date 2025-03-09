// app/checkout/page.tsx
import { redirect } from 'next/navigation'

export default function CheckoutPage() {
  redirect('/checkout/shipping')
}
