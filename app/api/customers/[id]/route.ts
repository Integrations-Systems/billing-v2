import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

type Params = {
  params: {
    id: string;
  };
};


export async function PUT(
  req: Request,
  { params }: Params) {

  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");

  const jwtToken = tokenCookie?.value;

  const host = process.env.HOST_PROD;

  const { id } = await params;

  const body = await req.json();


  if (!id) {
    return NextResponse.json(
      { message: 'Customer ID is required' },
      { status: 400 }
    );
  }

  const customerPayload = {
    legal_name: body.customer.legal_name?.toUpperCase(),
    tax_id: body.customer.tax_id,
    tax_system: body.customer.tax_system,
    email: body.customer.email,
    phone: body.customer.phone || "",
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


  try {

    const res = await fetch(`${host}/v1/organizations/clients/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerPayload),
    });

    const json = await res.json();


    if(json.error){
      return NextResponse.json(
        { error: true, message: json.error || 'Error updating customer' },
        { status: res.status }
      );
    }

    if (json.status === 400) {
      return NextResponse.json(
        { success: false, data: json },
        { status: json.status },
      );
    }


    return NextResponse.json(
      { success: true, data: json },
      { status: 200 },
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: 'Hubo un error al actualizar el cliente en el servidor', error: error },
      { status: 500 }
    );
  }

}