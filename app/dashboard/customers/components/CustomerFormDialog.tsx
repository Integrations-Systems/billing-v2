"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Customer } from "@/app/models/Customer";
import { customerSchema } from "../schema/customerFormSchema";

import { useCreateCustomer } from "../hooks/mutations/useCreateCustomer";
import { useUpdateCustomer } from "../hooks/mutations/useUpdateCustomer";
import { Spinner } from "@/components/ui/spinner";



type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormDialogProps {
    mode: "create" | "edit";
    user?: Customer | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CustomerFormDialog({
    mode,
    user,
    open,
    onOpenChange,
}: CustomerFormDialogProps) {
    const createCustomer = useCreateCustomer();
    const updateCustomer = useUpdateCustomer();

    const form = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            legal_name: "",
            email: "",
            tax_id: "",
            tax_system: "",
            phone: "",
            address: {
                street: "",
                interior: "",
                exterior: "",
                neighborhood: "",
                city: "",
                municipality: "",
                state: "",
                country: "MEX",
                postal_code: "",
            },
        },
    });

    useEffect(() => {
        if (mode === "edit" && user) {
            form.reset({
                legal_name: user.legal_name,
                email: user.email,
                tax_id: user.tax_id,
                tax_system: user.tax_system,
                phone: user.phone,
                address: {
                    street: user.address.street,
                    exterior: user.address.exterior,
                    interior: user.address.interior,
                    neighborhood: user.address.neighborhood,
                    city: user.address.city,
                    municipality: user.address.municipality,
                    state: user.address.state,
                    country: user.address.country,
                    postal_code: user.address.postal_code,
                },
            });
        }

        if (mode === "create") {
            form.reset({
                legal_name: "",
                email: "",
                tax_id: "",
                tax_system: "",
                phone: "",
                address: {
                    street: "",
                    exterior: "",
                    interior: "",
                    neighborhood: "",
                    city: "",
                    municipality: "",
                    state: "",
                    country: "MEX",
                    postal_code: "",
                },
            });
        }
    }, [mode, user, form]);

    const onSubmit = (values: CustomerFormData) => {
        if (mode === "create") {
            createCustomer.mutate(values as unknown as Customer, {
                onSuccess: () => {
                    form.reset();
                    onOpenChange(false);
                },
            });

            return;
        }

        if (!user) return;

        const payload: Customer = {
            ...user,
            ...values,
        };

        updateCustomer.mutate(payload, {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    };

    const isPending =
        createCustomer.isPending ||
        updateCustomer.isPending;

    const isError = createCustomer.isError ||
        updateCustomer.isError;

    const error = createCustomer.error ||
        updateCustomer.error;

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) {
                    form.reset();
                }

                onOpenChange(value);
            }}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create"
                            ? "Nuevo cliente"
                            : "Editar cliente"}
                    </DialogTitle>

                    <DialogDescription>
                        Captura la información fiscal del cliente.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Datos fiscales
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="legal_name"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>
                                                Razón social
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="Empresa SA de CV"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tax_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                RFC
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder="XAXX010101000"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tax_system"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Régimen fiscal
                                            </FormLabel>

                                            <Select
                                                value={field.value}
                                                onValueChange={
                                                    field.onChange
                                                }
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona" />
                                                    </SelectTrigger>
                                                </FormControl>

                                                <SelectContent>
                                                    <SelectItem value="601">
                                                        601 - General de Ley Personas Morales
                                                    </SelectItem>

                                                    <SelectItem value="626">
                                                        626 - RESICO
                                                    </SelectItem>

                                                    <SelectItem value="612">
                                                        612 - Personas Físicas con Actividades Empresariales
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Teléfono
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Domicilio fiscal
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="address.street"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Calle
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address.interior"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                No. Interior
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address.exterior"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                No. Exterior
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address.neighborhood"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Colonia
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address.postal_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Código Postal
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address.city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Ciudad
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address.municipality"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Municipio
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address.state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Estado
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}

                                    name="address.country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                País
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {isError && (
                            <p className="text-sm text-destructive">
                                {(error as Error).message}
                            </p>
                        )}
                        <div className="flex justify-end gap-2">

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    onOpenChange(false)
                                }
                            >
                                Cancelar
                            </Button>

                            <Button type="submit"
                            >

                                {isPending ? (
                                    <>
                                        <Spinner data-icon="inline-start" />
                                        <span className="ml-2">Cargando...</span>
                                    </>
                                ) : (
                                    mode === "create" ? "Crear cliente" : "Actualizar cliente"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}