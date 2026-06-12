import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string("El nombre es obligatorio"),
  last_name: z.string("Los apellidos son obligatorios"),
  email: z.email("Email inválido"),
  phone: z.string("El teléfono es obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type SignUpFormData = z.infer<typeof registerSchema>;