import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body;

    console.log(process.env.HOST_PROD)

    const response = await fetch(`http://78.14.5.157/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })

     console.log("RES", response)

    const json = await response.text()

    console.log("JSON", json)

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: json,
        },
        {
          status: response.status,
        }
      );
    }

    const res = NextResponse.json(
      {
        success: true,
        message: json,
        token: json,
        expires_at: json,
      },
      {
        status: response.status,
      }
    )

    res.cookies.set("token", json, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(json),
    });

    return res;

  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: `Error inesperado: ${error}` }, { status: 500 })
  }
}