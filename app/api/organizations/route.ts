// app/api/organizations/route.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const host = process.env.HOST_PROD;

  try {
    const body = await req.json();
    const name = body?.name;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const orgRes = await fetch(`${host}/v1/organizations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const orgData = await orgRes.json();

    if (!orgRes.ok) {
      return NextResponse.json(
        { message: orgData.error || "Error creating organization" },
        { status: orgRes.status }
      );
    }

    return NextResponse.json({
      organization: orgData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected error",
        detail: String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const payload = {
      organization: {
        name: body.legal_name,
        legal_name: body.legal_name,
        phone: body.phone,
        website: body.website || "",
        support_email: body.email || "",
        address: {
          street: body.street,
          exterior: body.exterior,
          interior: body.interior,
          neighborhood: body.neighborhood,
          city: body.city,
          municipality: body.municipality,
          state: body.state,
          country: body.country,
          postal_code: body.postal_code,
        },
        tax_regime: body.tax_id?.split(" - ")[0] || "",
      },
      store: {
        name: "Mi Tienda Principal",
        description: "Tienda principal del negocio",
        street: body.street,
        phone: body.phone || "",
        email: body.email || "",
      },
    };

    const host = process.env.HOST_PROD;

    const response = await fetch(`${host}/v1/organizations/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error updating organization", detail: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unexpected error",
        detail: String(error),
      },
      { status: 500 }
    );
  }
}