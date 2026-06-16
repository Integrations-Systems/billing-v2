"use client";

import Link from "next/link";
import CustomersTable from "./CustomersTable";
import { useGetStatusOnboarding } from "../hooks/queries/useOnboarding";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { FileText, ArrowRight } from "lucide-react";

import { useCustomers } from '../hooks/queries/useCustomers'

export default function UsersView() {
    const { data: onboarding, isLoading: onboardinIsLoading } = useGetStatusOnboarding();
    const { data: customers, isLoading: customersIsLoading } = useCustomers();

    console.log(customers)

    if (onboardinIsLoading || customersIsLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {onboarding === 2 ? (
                <div className="space-y-6">
                    <CustomersTable
                        users={customers.customers}
                        onDelete={(user) => console.log(user)}
                    />
                </div>
            ) : (
                <Card className="max-w-2xl blue-amber-200">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-blue-100 p-3">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>

                            <div>
                                <CardTitle>
                                    Completa tu proceso de onboarding
                                </CardTitle>

                                <CardDescription>
                                    Antes de comenzar a gestionar tus clientes,
                                    necesitamos que completes la configuración
                                    inicial de tu cuenta.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Button asChild>
                            <Link href="/invoices">
                                Continuar onboarding
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}