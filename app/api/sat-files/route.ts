import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const jwtToken = tokenCookie?.value;
    if (!jwtToken) {
      return NextResponse.json({ ok: false, message: "No token found" }, { status: 401 });
    }

    const formData = await req.formData();

    const cerFile = formData.get("cer") as File | null;
    const keyFile = formData.get("key") as File | null;
    const password = formData.get("password") as string | null;
    const host = process.env.HOST_PROD;

    if (!cerFile || !keyFile || !password) {
      return NextResponse.json(
        { ok: false, message: "Faltan archivos o contraseña" },
        { status: 400 }
      );
    }

    const facturapiForm = new FormData();
    facturapiForm.append("cer", cerFile);
    facturapiForm.append("key", keyFile);
    facturapiForm.append("password", password);

    console.log(facturapiForm)

    const response = await fetch ( `${host}/v1/organizations/upload/certificate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: facturapiForm,
      }

    )
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { ok: false, message: "Error subiendo POST certificado", detail: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);


  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        { ok: false, message: "Unexpected error", detail: String(err) },
        { status: 500 }
      );
    }
  }
}