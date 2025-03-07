import CredentialsProvider from 'next-auth/providers/credentials'

import type { NextAuthConfig } from 'next-auth'

export default {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}/auth/login`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     phoneOrEmail: credentials.email,
        //     password: credentials.password
        //   })
        // })
        // if (!authResponse.ok) {
        //   return null
        // }

        // const user = await authResponse.json()

        // return user
        // Datos de prueba
        const testUser = {
          id: '1',
          name: 'Juan Sánchez',
          email: 'test@example.com'
        }

        // Simulación de validación de credenciales
        if (credentials?.email === 'test@example.com' && credentials?.password === 'password123') {
          return testUser
        }

        return null // Si las credenciales son incorrectas
      }
    })
  ]
} satisfies NextAuthConfig
