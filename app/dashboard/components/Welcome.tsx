import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
    ArrowRight,
    CreditCard,
    FileText,
    Settings,
    Sparkles,
} from "lucide-react";
import decodeJwt from '@/app/utils/decodeJwt'
import { Jwt } from "@/app/models/Jwt";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Welcome() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    const jwtValue: Jwt | null = decodeJwt(String(token?.value));

    return (
        <div className="space-y-8">
            {/* Hero */}
            <Card className="overflow-hidden border-0 bg-linear-to-br from-primary/10 via-background to-primary/5">
                <CardContent className="p-8 md:p-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl space-y-3">
                            <div className="flex items-center gap-2 text-primary">
                                <Sparkles className="h-5 w-5" />
                                <span className="text-sm font-medium">
                                    Bienvenido de vuelta
                                </span>
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight">
                                Hola, {jwtValue?.first_name} 👋
                            </h1>

                            <p className="text-muted-foreground text-lg">
                                Gestiona tu cuenta, explora herramientas y mantente al día con
                                todo lo que sucede en la plataforma.
                            </p>
                        </div>

                        <Button size="lg">
                            <Link href='dashboard/customers'>Comenzar</Link>
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <section className="space-y-3">
                <div>
                    <h2 className="text-xl font-semibold">Acciones rápidas</h2>
                    <p className="text-muted-foreground text-sm">
                        Accede rápidamente a las secciones más utilizadas.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>

                            <h3 className="font-semibold">Documentación</h3>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Consulta guías, ejemplos y referencias técnicas.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <CreditCard className="h-6 w-6 text-primary" />
                            </div>

                            <h3 className="font-semibold">Facturación</h3>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Administra pagos, facturas y movimientos.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md">
                        <CardContent className="p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                <Settings className="h-6 w-6 text-primary" />
                            </div>

                            <h3 className="font-semibold">Configuración</h3>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Personaliza tu experiencia y preferencias.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Primeros pasos */}
            <Card>
                <CardHeader>
                    <CardTitle>Primeros pasos</CardTitle>
                    <CardDescription>
                        Algunas acciones recomendadas para comenzar.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                            <h3 className="font-medium">Completa tu perfil</h3>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Mantén tu información actualizada para aprovechar todas las
                                funcionalidades.
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <h3 className="font-medium">Explora la documentación</h3>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Descubre ejemplos, guías y recursos para sacar el máximo provecho.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}