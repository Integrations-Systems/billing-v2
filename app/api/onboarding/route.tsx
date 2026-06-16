import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const host = process.env.HOST_PROD;
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const jwtToken = tokenCookie?.value;

    const res = await fetch(`${host}/v1/organizations/onboarding/status`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
    })
    return NextResponse.json(await res.json())
}

export async function PATCH() {
    const host = process.env.HOST_PROD;
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");
    const jwtToken = tokenCookie?.value;

    const res = await fetch(`${host}/v1/organizations/onboarding/status/recompute`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        },
    })
    return NextResponse.json(await res.json())
}