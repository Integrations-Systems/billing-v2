"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { certificatesSchema } from "../schema/certificates.schema";
import { useCreateSatFiles } from "../hooks/mutations/useCreateSatFiles";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type FormData = z.infer<typeof certificatesSchema>;

export function CompanyCertificates() {
    const { mutate, isError, error, isPending, isSuccess } = useCreateSatFiles();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(certificatesSchema),
    });

    const onSubmit = (data: FormData) => {
        mutate(data);
    };

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Certificados SAT</CardTitle>
                <CardDescription>
                    Sube tu certificado (.cer), llave privada (.key) y la contraseña
                    correspondiente para habilitar la facturación electrónica.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {isError && (
                        <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3">
                            <p className="text-sm text-destructive">
                                {error.message}
                            </p>
                        </div>
                    )}

                    {isSuccess && (
                        <div className="rounded-md border border-green-500/20 bg-green-500/10 p-3">
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Certificados cargados correctamente.
                            </p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Archivo .CER
                        </label>

                        <Input
                            type="file"
                            accept=".cer"
                            disabled={isPending}
                            {...register("cerFile")}
                        />

                        {errors.cerFile && (
                            <p className="text-sm text-destructive">
                                {errors.cerFile.message as string}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Archivo .KEY
                        </label>

                        <Input
                            type="file"
                            accept=".key"
                            disabled={isPending}
                            {...register("keyFile")}
                        />

                        {errors.keyFile && (
                            <p className="text-sm text-destructive">
                                {errors.keyFile.message as string}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Contraseña de la llave privada
                        </label>

                        <Input
                            type="password"
                            placeholder="********"
                            disabled={isPending}
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    >
                        {isPending && <Spinner data-icon="inline-start" />}
                        {isPending ? "Validando certificados..." : "Guardar certificados"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}