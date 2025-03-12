import { Product } from 'raiz/src/modules/products/type/product'
import { Order } from '../types/order'
import { Customer } from '../types/customer'

export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    name: 'Conjunto diferencial',

    description:
      'El juego de piñones corona Sonalika, con una relación de 12/38 dientes, es una opción robusta y confiable para sistemas de transmisión.',
    category: 'Últimas llegadas',
    images: ['/producto1.jpg', '/image.png', '/banner4.jpg'],
    price: 59.99,
    // variants: [
    //   {
    //     id: 'var_001',
    //     name: 'Talla S - Azul',
    //     price: 29.99,
    //     discount_percentage: 10,
    //     stock: 10,
    //     sku: 'TS-AZ-001',
    //     image: 'https://example.com/images/camiseta_azul.jpg'
    //   },
    //   {
    //     id: 'var_002',
    //     name: 'Talla M - Azul',
    //     price: 31.99,
    //     stock: 15,
    //     sku: 'TM-AZ-002',
    //     image: 'https://example.com/images/camiseta_azul.jpg'
    //   }
    // ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod_002',
    name: 'Repuestos Originales Yale',
    description: 'Repuestos originales Yale.',
    category: 'Últimas llegadas',
    images: ['/producto2.png'],
    price: 59.99, // Precio agregado cuando no hay variantes
    discount_percentage: 20, // 20% de descuento aplicado al precio base
    // Este producto NO tiene variantes
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod_003',
    name: 'Juego de piñones corona sonalika',
    description: 'Repuestos originales Yale.',
    category: 'Últimas llegadas',
    images: ['/producto5.jpg'],
    price: 59.99, // Precio agregado cuando no hay variantes
    discount_percentage: 20, // 20% de descuento aplicado al precio base
    // Este producto NO tiene variantes
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod_004',
    name: 'Repuestos Orginales Sonalika',
    description: 'Repuestos originales Yale.',
    category: 'Últimas llegadas',
    images: ['/producto4.png'],
    price: 59.99, // Precio agregado cuando no hay variantes
    discount_percentage: 20, // 20% de descuento aplicado al precio base
    // Este producto NO tiene variantes
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod_005',
    name: 'Repuestos Originales Hyundai',
    description: 'Repuestos originales Yale.',
    category: 'Últimas llegadas',
    images: ['/image.png'],
    price: 59.99, // Precio agregado cuando no hay variantes
    discount_percentage: 20, // 20% de descuento aplicado al precio base
    // Este producto NO tiene variantes
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod_006',
    name: 'Bomba Hidráulica para montacargas Yale',
    description:
      'Bomba Hidráulica de levante para montacarga eléctrico Yale ERP050VL. Eficiencia y duración en operaciones.',
    category: 'Últimas llegadas',
    images: ['/producto3.jpg'],
    price: 89.99,
    // variants: [
    //   {
    //     id: 'var_005',
    //     name: 'Negro',
    //     price: 89.99,
    //     stock: 5,
    //     sku: 'RW-NG-001',
    //     image: 'https://example.com/images/reloj_negro.jpg'
    //   },
    //   {
    //     id: 'var_006',
    //     name: 'Plata',
    //     price: 92.99,
    //     stock: 7,
    //     sku: 'RW-PL-002',
    //     image: 'https://example.com/images/reloj_plata.jpg'
    //   }
    // ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const orderWithVariants: Order[] = [
  {
    id: 'order_456',
    customer_id: 'cus_456',
    email: 'cliente2@example.com',
    currency_code: 'PEN',
    display_id: 1002,
    created_at: '2023-10-02T12:00:00Z',
    updated_at: '2023-10-02T12:00:00Z',
    status: 'completado',
    payment_status: 'pagado',
    fulfillment_status: 'entregado',
    customer: {
      id: 'cus_456',
      has_account: true,
      email: 'cliente2@example.com',
      first_name: 'María',
      last_name: 'Gómez',
      phone: '+51 888 888 888',
      document_type: 'DNI',
      document_number: '87654321',
      addresses: [
        {
          id: 'addr_456',
          address_name: 'Oficina',
          address_1: 'Calle Las Begonias 456',
          city: 'Lima',
          province: 'Lima',
          district: 'Miraflores',
          country_code: 'PE',
          is_default_shipping: true,
          is_default_billing: true
        }
      ],
      created_at: '2023-10-02T12:00:00Z',
      updated_at: '2023-10-02T12:00:00Z'
    },
    items: [
      {
        id: 'prod_456',
        name: 'Zapatillas deportivas',
        description: 'Zapatillas para correr',
        category: 'Calzado',
        images: ['https://example.com/zapatillas.jpg'],
        variants: [
          {
            id: 'var_123',
            name: 'Talla 38',
            price: 120,
            stock: 10,
            sku: 'ZAP-NEGRO-38',
            image: 'https://example.com/zapatillas-38.jpg',
            discount_percentage: 15 // 15% de descuento
          },
          {
            id: 'var_456',
            name: 'Talla 40',
            price: 120,
            stock: 5,
            sku: 'ZAP-BLANCO-40',
            image: 'https://example.com/zapatillas-40.jpg'
          }
        ],
        createdAt: '2023-10-02T12:00:00Z',
        updatedAt: '2023-10-02T12:00:00Z'
      }
    ],
    payments: [
      {
        id: 'pay_456',
        amount: 204, // Precio con descuento (120 - 15% = 102 por cada par)
        currency_code: 'PEN',
        status: 'autorizado',
        provider_id: 'MercadoPago',
        captured_amount: 204,
        refunded_amount: 0,
        created_at: '2023-10-02T12:00:00Z',
        updated_at: '2023-10-02T12:00:00Z'
      }
    ],
    shipping_methods: [
      {
        id: 'ship_456',
        method: 'Recojo en tienda',
        amount: 0, // Sin costo de envío
        address: {
          id: 'addr_456',
          address_name: 'Oficina',
          address_1: 'Calle Las Begonias 456',
          city: 'Lima',
          province: 'Lima',
          district: 'Miraflores',
          country_code: 'PE',
          is_default_shipping: true,
          is_default_billing: true
        },
        status: 'entregado',
        created_at: '2023-10-02T12:00:00Z',
        updated_at: '2023-10-02T12:00:00Z'
      }
    ],
    discounts: [], // No hay descuentos adicionales
    transactions: [
      {
        id: 'trans_456',
        order_id: 'order_456',
        amount: 204,
        currency_code: 'PEN',
        reference: 'capture',
        status: 'completada',
        created_at: '2023-10-02T12:00:00Z',
        updated_at: '2023-10-02T12:00:00Z'
      }
    ],
    summary: {
      subtotal: 240, // 120 x 2
      tax_total: 43.2, // IGV 18%
      shipping_total: 0,
      discount_total: 36, // Descuento del 15% en una variante
      total: 247.2 // 240 + 43.2 - 36
    }
  }
]

export const customer4: Customer = {
  id: 'cus_101',
  has_account: false,
  email: 'cliente.ocasional@example.com',
  first_name: 'Ana',
  last_name: 'Torres',
  phone: '+51 666 666 666',
  document_type: 'DNI',
  document_number: '11223344',
  addresses: [
    {
      id: 'addr_101',
      address_name: 'Casa',
      address_1: 'Jr. Huancavelica 101',
      city: 'Lima',
      province: 'Lima',
      district: 'Breña',
      country_code: 'PE',
      is_default_shipping: true,
      is_default_billing: true
    }
  ],
  created_at: '2023-10-04T12:00:00Z',
  updated_at: '2023-10-04T12:00:00Z'
}
