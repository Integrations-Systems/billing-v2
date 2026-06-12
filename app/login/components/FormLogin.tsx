"use client";

import { useLogin } from "@/app/login/hooks/useLogin";
import { loginSchema, LoginFormData } from "@/app/login/schemas/login-schema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Spinner } from "@/components/ui/spinner";

export default function FormLogin() {
  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg border shadow-md">
      <h1 className="text-2xl font-bold">Iniciar sesión 🚀</h1>

      <p className="text-sm text-muted-foreground mt-1">
        Introduce tus credenciales para acceder a tu cuenta.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {loginMutation.isError && (
            <p className="text-sm text-destructive">
              {(loginMutation.error as Error).message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Spinner data-icon="inline-start" />
                <span className="ml-2">Cargando...</span>
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}