import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  companySchema,
  CompanyFormValues,
} from "../schema/company.schema";

import { useCreateCompany } from "../hooks/mutations/useCreateCompany";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function CompanyInfo() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const createCompany = useCreateCompany();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: CompanyFormValues) => {
    try {
      await createCompany.mutateAsync({
        name: values.name,
        image: file ?? values.image,
      });

      form.reset();
      setPreview(null);
      setFile(null);
    } catch (error) {
      // no reset si falla (importante para retry)
      console.error(error);
    }
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Información de la compañía</CardTitle>
        <CardDescription>
          Configura el nombre y logo de tu organización.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* IMAGE */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>

                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        field.onChange(file);
                        setFile(file);
                        setPreview(URL.createObjectURL(file));
                      }}
                    />
                  </FormControl>

                  {preview && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-32 rounded-lg border object-cover"
                    />
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la compañía</FormLabel>
                  <FormControl>
                    <Input placeholder="Coca Cola" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={createCompany.isPending}
            >
              {createCompany.isPending
                ? "Guardando..."
                : "Guardar"}
            </Button>

            {createCompany.isError && (
              <p className="text-sm text-destructive">
                {(createCompany.error as Error).message}
              </p>
            )}

            {createCompany.isPending && (
              <p className="text-sm text-muted-foreground">
                Creando organización y subiendo logo...
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}