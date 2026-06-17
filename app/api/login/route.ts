import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body;

    const response = await fetch(`${process.env.HOST_PROD}/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })


    const json = await response.json();

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

    const res = NextResponse.json(
      {
        success: true,
        message: json.message,
        token: json.token,
        expires_at: json.expires_at,
      },
      {
        status: response.status,
      }
    )

    res.cookies.set("token", json.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(json.expires_at),
    });

    return res;

  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: `Error inesperado del servidor: ${JSON.stringify(error)}` }, { status: 500 })
  }
}