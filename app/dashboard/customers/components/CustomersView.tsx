"use client";

import { useState } from "react";
import Link from "next/link";

import CustomersTable from "./CustomersTable";
import CustomerFormDialog from "./CustomerFormDialog";

import { useGetStatusOnboarding } from "../hooks/queries/useOnboarding";
import { useCustomers } from "../hooks/queries/useCustomers";
import { useDeleteCustomer } from "../hooks/mutations/useDeleteCustomer";

import { Customer } from "@/app/models/Customer";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
    FileText,
    ArrowRight,
    Plus,
} from "lucide-react";

export default function UsersView() {
    const [openCreate, setOpenCreate] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);

    const [selectedCustomer, setSelectedCustomer] =
        useState<Customer | null>(null);

    const [customerToDelete, setCustomerToDelete] =
        useState<Customer | null>(null);


    const {
        data: onboarding,
        isLoading: onboardingIsLoading,
    } = useGetStatusOnboarding();

    const {
        data: customers,
        isLoading: customersIsLoading,
    } = useCustomers();

    const deleteCustomer = useDeleteCustomer();

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setOpenEdit(true);
    };

    const handleDelete = (customer: Customer) => {
        setCustomerToDelete(customer);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        if (!customerToDelete) return;

        deleteCustomer.mutate(customerToDelete.id, {
            onSuccess: () => {
                setOpenDelete(false);
                setCustomerToDelete(null);
            },
        });
    };
    if (onboardingIsLoading || customersIsLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {onboarding === 3 ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Clientes
                            </h1>

                            <p className="text-muted-foreground">
                                Administra tus clientes y su información fiscal.
                            </p>
                        </div>

                        <Button
                            onClick={() => setOpenCreate(true)}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Nuevo cliente
                        </Button>
                    </div>

                    <CustomersTable
                        users={customers?.customers ?? []}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* CREATE */}
                    <CustomerFormDialog
                        mode="create"
                        open={openCreate}
                        onOpenChange={setOpenCreate}
                    />

                    {/* EDIT */}
                    {selectedCustomer && (
                        <CustomerFormDialog
                            key={selectedCustomer.id}
                            mode="edit"
                            user={selectedCustomer}
                            open={openEdit}
                            onOpenChange={(open) => {
                                setOpenEdit(open);

                                if (!open) {
                                    setSelectedCustomer(null);
                                }
                            }}
                        />
                    )}

                    {/* DELETE */}
                    <AlertDialog
                        open={openDelete}
                        onOpenChange={(open) => {
                            setOpenDelete(open);

                            if (!open) {
                                setCustomerToDelete(null);
                            }
                        }}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    ¿Eliminar cliente?
                                </AlertDialogTitle>

                                <AlertDialogDescription>
                                    {customerToDelete
                                        ? `Esta acción eliminará permanentemente a "${customerToDelete.legal_name}". Esta acción no se puede deshacer.`
                                        : "Esta acción no se puede deshacer."}
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancelar
                                </AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={confirmDelete}
                                    disabled={
                                        deleteCustomer.isPending
                                    }
                                >
                                    {deleteCustomer.isPending
                                        ? "Eliminando..."
                                        : "Eliminar"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ) : (
                <Card className="max-w-2xl">
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
                            <Link href="/dashboard/invoices">
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