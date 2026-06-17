"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  companyDetailSchema,
  CompanyFormValues,
} from "../schema/company.detail.schema";

import { useUpdateCompany } from "../hooks/mutations/useUpdateCompany";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function CompanyDetail() {
  const { mutate, isPending, isError, error, isSuccess } =
    useUpdateCompany();

  const { register, handleSubmit } = useForm<CompanyFormValues>({
    resolver: zodResolver(companyDetailSchema),
    defaultValues: {
      legal_name: "",
      phone: "",
      website: "",
      email: "",
      street: "",
      exterior: "",
      interior: "",
      neighborhood: "",
      city: "",
      municipality: "",
      state: "",
      country: "",
      postal_code: "",
      tax_id: "",
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    mutate(data);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Información de la empresa
          </h1>

          <p className="text-muted-foreground mt-2">
            Administra los datos de tu organización y su información fiscal.
          </p>
        </div>

        {/* Información General */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Información general
            </h2>

            <p className="text-sm text-muted-foreground">
              Información básica de tu empresa.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Razón social</Label>
              <Input
                placeholder="ACME S.A. de C.V."
                {...register("legal_name")}
              />
            </div>

            <div className="space-y-2">
              <Label>RFC</Label>
              <Input
                placeholder="XAXX010101000"
                {...register("tax_id")}
              />
            </div>

            <div className="space-y-2">
              <Label>Correo electrónico</Label>
              <Input
                placeholder="contacto@empresa.com"
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input
                placeholder="+52 55 1234 5678"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Sitio web</Label>
              <Input
                placeholder="https://empresa.com"
                {...register("website")}
              />
            </div>
          </div>
        </Card>

        {/* Domicilio Fiscal */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Domicilio fiscal
            </h2>

            <p className="text-sm text-muted-foreground">
              Dirección registrada de tu organización.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            <div className="space-y-2 md:col-span-8">
              <Label>Calle</Label>
              <Input
                placeholder="Nombre de la calle"
                {...register("street")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Número exterior</Label>
              <Input
                placeholder="123"
                {...register("exterior")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Número interior</Label>
              <Input
                placeholder="A"
                {...register("interior")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Colonia</Label>
              <Input
                placeholder="Colonia"
                {...register("neighborhood")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Ciudad</Label>
              <Input
                placeholder="Ciudad"
                {...register("city")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Municipio o alcaldía</Label>
              <Input
                placeholder="Municipio o alcaldía"
                {...register("municipality")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Estado</Label>
              <Input
                placeholder="Estado"
                {...register("state")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>País</Label>
              <Input
                placeholder="México"
                {...register("country")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Código postal</Label>
              <Input
                placeholder="00000"
                {...register("postal_code")}
              />
            </div>
          </div>
        </Card>

        {/* Mensajes de estado */}
        {(isError || isSuccess) && (
          <Card className="p-4">
            {isError && (
              <p className="text-sm text-red-500">
                {error?.message}
              </p>
            )}

            {isSuccess && (
              <p className="text-sm text-green-600">
                La información de la organización se actualizó correctamente.
              </p>
            )}
          </Card>
        )}

        {/* Acciones */}
        <div className="flex justify-end border-t pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
          >
            {isPending ? "Guardando cambios..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}