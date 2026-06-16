import { NextResponse } from "next/server";
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
        }, { status: json.status });

    } catch (err) {

        return {
            error: true,
            message: 'Error inesperado: ' + err,
            customers: []
        };
    }
}
