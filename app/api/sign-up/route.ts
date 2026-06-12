import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { first_name, last_name, phone, email, password } = body;

    const response = await fetch(`${process.env.HOST_PROD}/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "first_name": first_name,
        "last_name": last_name,
        "phone": phone,
        "email": email,
        "password": password
      }),
    })

    const json = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: json.error,
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: json.message,
        user: json.user,
        organization: json.organization,
        store: json.store
      },
      {
        status: response.status,
      }
    )

  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: `Error inesperado: ${error}` }, { status: 500 })
  }
}