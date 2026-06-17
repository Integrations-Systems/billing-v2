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