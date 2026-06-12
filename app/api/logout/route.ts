// app/api/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ message: 'Sesión cerrada' })

  // Elimina la cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // Fuerza expiración
  })

  return response
}
