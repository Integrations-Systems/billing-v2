"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { companyDetailSchema, CompanyFormValues } from "../schema/company.detail.schema";
import { useUpdateCompany } from "../hooks/mutations/useUpdateCompany";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function CompanyDetail() {
  const { mutate, isPending, isError, error, isSuccess } =
    useUpdateCompany();

  const {
    register,
    handleSubmit,
  } = useForm<CompanyFormValues>({
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
    <Card className="p-6 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <h2 className="text-xl font-bold">Organization</h2>

        <Input placeholder="Legal name" {...register("legal_name")} />
        <Input placeholder="Phone" {...register("phone")} />
        <Input placeholder="Website" {...register("website")} />
        <Input placeholder="Email" {...register("email")} />

        <h3 className="font-semibold">Address</h3>

        <Input placeholder="Street" {...register("street")} />
        <Input placeholder="Exterior" {...register("exterior")} />
        <Input placeholder="Interior" {...register("interior")} />
        <Input placeholder="Neighborhood" {...register("neighborhood")} />
        <Input placeholder="City" {...register("city")} />
        <Input placeholder="Municipality" {...register("municipality")} />
        <Input placeholder="State" {...register("state")} />
        <Input placeholder="Country" {...register("country")} />
        <Input placeholder="Postal code" {...register("postal_code")} />

        <h3 className="font-semibold">Fiscal</h3>

        <Input placeholder="Tax ID" {...register("tax_id")} />

        {/* Estados */}
        {isError && (
          <p className="text-red-500 text-sm">
            {error?.message}
          </p>
        )}

        {isSuccess && (
          <p className="text-green-500 text-sm">
            Updated successfully
          </p>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Card>
  );
}