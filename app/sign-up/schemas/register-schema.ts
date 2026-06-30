import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().trim().min(1, "El nombre es obligatorio"),
  last_name: z.string().trim().min(1, "Los apellidos son obligatorios"),
  email: z.string().trim().email("Email inválido"),
  phone: z.string().trim().min(1, "El teléfono es obligatorio"),
  password: z
    .string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type SignUpFormData = z.infer<typeof registerSchema>;