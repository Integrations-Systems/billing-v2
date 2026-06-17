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
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Company Information
          </h1>

          <p className="text-muted-foreground mt-2">
            Manage your organization details and fiscal information.
          </p>
        </div>

        {/* General Information */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              General Information
            </h2>

            <p className="text-sm text-muted-foreground">
              Basic information about your company.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Legal Name</Label>
              <Input
                placeholder="ACME Corporation"
                {...register("legal_name")}
              />
            </div>

            <div className="space-y-2">
              <Label>Tax ID</Label>
              <Input
                placeholder="RFC / Tax ID"
                {...register("tax_id")}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                placeholder="contact@company.com"
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                placeholder="+52 55 1234 5678"
                {...register("phone")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Website</Label>
              <Input
                placeholder="https://company.com"
                {...register("website")}
              />
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Address
            </h2>

            <p className="text-sm text-muted-foreground">
              Physical address of your organization.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            <div className="space-y-2 md:col-span-8">
              <Label>Street</Label>
              <Input
                placeholder="Street"
                {...register("street")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Exterior</Label>
              <Input
                placeholder="123"
                {...register("exterior")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Interior</Label>
              <Input
                placeholder="A"
                {...register("interior")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Neighborhood</Label>
              <Input
                placeholder="Neighborhood"
                {...register("neighborhood")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>City</Label>
              <Input
                placeholder="City"
                {...register("city")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Municipality</Label>
              <Input
                placeholder="Municipality"
                {...register("municipality")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>State</Label>
              <Input
                placeholder="State"
                {...register("state")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Country</Label>
              <Input
                placeholder="Country"
                {...register("country")}
              />
            </div>

            <div className="space-y-2 md:col-span-4">
              <Label>Postal Code</Label>
              <Input
                placeholder="00000"
                {...register("postal_code")}
              />
            </div>
          </div>
        </Card>

        {/* Status Messages */}
        {(isError || isSuccess) && (
          <Card className="p-4">
            {isError && (
              <p className="text-sm text-red-500">
                {error?.message}
              </p>
            )}

            {isSuccess && (
              <p className="text-sm text-green-500">
                Organization updated successfully.
              </p>
            )}
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-end border-t pt-6">
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
          >
            {isPending ? "Saving changes..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}