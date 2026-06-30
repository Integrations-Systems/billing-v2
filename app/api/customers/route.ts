import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET() {

  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");

  const jwtToken = tokenCookie?.value;

  const host = process.env.HOST_PROD;

  try {
    const res = await fetch(`${host}/v1/organizations/clients`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
    });

    const json = await res.json();

    if (json.status === 401) {
      return NextResponse.json({
        error: true,
        message: 'No autorizado, verifica tu clave de API',
      }, { status: json.status });
    }

    if (json.status === 402) {
      return NextResponse.json({
        error: true,
        message: json.message || 'Payment Required',
        customers: []
      }, { status: json.status });
    }

    return NextResponse.json({
      error: false,
      customers: json.clients ?? [],
      total: json.total,
      limit: json.limit,
      offset: json.offset
    }, { status: json.status });

  } catch (err: unknown) {

    return NextResponse.json(
      { ok: false, message: 'Unexpected error', detail: String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");

  const jwtToken = tokenCookie?.value;

  const host = process.env.HOST_PROD;

  try {
    // Obtener el parámetro 'query' desde la URL
    const body = await req.json();

    const customerPayload = {
      legal_name: body.customer.legal_name?.toUpperCase(),
      tax_id: body.customer.tax_id,
      tax_system: body.customer.tax_system,
      email: body.customer.email,
      phone: body.customer.phone,
      default_invoice_use: body.customer.default_invoice_use,
      address: {
        street: body.customer.address.street,
        exterior: body.customer.address.exterior,
        interior: body.customer.address.interior,
        neighborhood: body.customer.address.neighborhood,
        city: body.customer.address.state,
        municipality: body.customer.address.municipality,
        postal_code: body.customer.address.postal_code,
        state: body.customer.address.state,
        country: body.customer.address.country,
      },
    };


    // Llamada a la API externa
    const res = await fetch(
      `${host}/v1/organizations/clients`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerPayload),
      }
    );

    // Convertir la respuesta a JSON
    const data = await res.json();

    console.log("Server POST: ", data)

    if (data.error) {
      return NextResponse.json(
        { error: true, ok: false, message: data.error || 'Error creating customer' },
        { status: res.status }
      );
    }

    if (data.success === false) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: true, ok: false, message: data.message || 'Error creating customer', detail: errorText },
        { status: res.status }
      );
    }



    return NextResponse.json({ error: false, data: data, status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, message: 'Unexpected error', detail: String(error) },
      { status: 500 }
    );
  }

}