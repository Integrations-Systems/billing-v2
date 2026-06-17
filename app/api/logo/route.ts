// app/api/v1/organizations/upload/logo/route.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");
  const jwtToken = tokenCookie?.value;

  const host = process.env.HOST_PROD;

  try {
    const formData = await req.formData();

    const image = formData.get("image");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        {
          error: true,
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const uploadFormData = new FormData();
    uploadFormData.append("image", image);

    const res = await fetch(
      `${host}/v1/organizations/upload/logo`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: uploadFormData,
      }
    );

    const data = await res.json();

    console.log("Server Upload Logo:", data);

    if (!res.ok) {
      return NextResponse.json(
        {
          error: true,
          ok: false,
          message:
            data.message ||
            data.error ||
            "Error uploading logo",
        },
        {
          status: res.status,
        }
      );
    }

    return NextResponse.json({
      error: false,
      data,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        message: "Unexpected error",
        detail: String(error),
      },
      {
        status: 500,
      }
    );
  }
}