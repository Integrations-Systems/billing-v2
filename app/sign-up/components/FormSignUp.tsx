"use client";

import { useSignUp } from "@/app/sign-up/hooks/useSignUp";
import { registerSchema, SignUpFormData } from "@/app/sign-up/schemas/register-schema";

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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function FormSignUp() {
    const signUpMutation = useSignUp();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = (data: SignUpFormData) => {
        signUpMutation.mutate(data);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-lg border shadow-md">
            <h1 className="text-2xl font-bold">Registrarse 💫</h1>

            <p className="text-sm text-muted-foreground mt-1">
                Introduce tus datos para crear tu cuenta.
            </p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-6"
                >

                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Miguel Abraham"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Castañeda Sánchez"
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
                                <FormLabel>Teléfono</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="5533889922"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="********"
                                            {...field}
                                            className="pr-10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {signUpMutation.isError && (
                        <p className="text-sm text-destructive">
                            {(signUpMutation.error as Error).message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={signUpMutation.isPending}
                    >
                        {signUpMutation.isPending ? (
                            <>
                                <Spinner data-icon="inline-start" />
                                <span className="ml-2">Cargando...</span>
                            </>
                        ) : (
                            "Registrarse"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}