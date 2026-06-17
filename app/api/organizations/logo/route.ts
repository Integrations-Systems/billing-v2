// app/api/organizations/logo/route.ts

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const host = process.env.HOST_PROD;

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized: missing token" },
            { status: 401 }
        );
    }

    if (!host) {
        return NextResponse.json(
            { message: "HOST_PROD is not defined" },
            { status: 500 }
        );
    }

    try {
        const formData = await req.formData();

        const image = formData.get("image");
        const organizationId = formData.get("organization_id");

        if (!image || !(image instanceof File)) {
            return NextResponse.json(
                { message: "Image is required" },
                { status: 400 }
            );
        }

        if (!organizationId || typeof organizationId !== "string") {
            return NextResponse.json(
                { message: "organization_id is required" },
                { status: 400 }
            );
        }

        const uploadForm = new FormData();
        uploadForm.append("image", image);

        const logoRes = await fetch(
            `${host}/v1/organizations/upload/logo`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: uploadForm,
            }
        );

        // 🔥 IMPORTANTE: evitar crash por JSON inválido
        const raw = await logoRes.text();

        let logoData = null;

        try {
            logoData = raw ? JSON.parse(raw) : null;
        } catch (err: unknown) {
            return NextResponse.json(
                {
                    message: "Error del servidor: " + err,
                    status: logoRes.status,
                    rawResponse: raw,
                },
                { status: 500 }
            );
        }

        if (!logoRes.ok) {
            return NextResponse.json(
                {
                    message: logoData?.error || "Error uploading logo",
                    details: logoData,
                },
                { status: logoRes.status }
            );
        }

        return NextResponse.json({
            logo: logoData,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Unexpected error",
                detail: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}