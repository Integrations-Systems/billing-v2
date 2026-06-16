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

    //const json = await response.json()

    //console.log("JSON", json)

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: response,
        },
        {
          status: response.status,
        }
      );
    }

    const res = NextResponse.json(
      {
        success: true,
        message: response,
        token: response,
        expires_at: response,
      },
      {
        status: response.status,
      }
    )

    res.cookies.set("token", '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      //expires: new Date(json.expires_at),
    });

    return res;

  } catch (error: unknown) {
    return NextResponse.json({ success: false, message: `Error inesperado del servidor: ${error}` }, { status: 500 })
  }
}