import { z } from "zod";

export const customerSchema = z.object({
  legal_name: z
    .string()
    .min(3, "La razón social debe tener al menos 3 caracteres"),

  email: z
    .email("Correo inválido"),

  tax_id: z
    .string()
    .min(12, "RFC inválido")
    .max(13, "RFC inválido"),

  tax_system: z
    .string()
    .min(1, "Selecciona un régimen fiscal"),

  phone: z
    .string()
    .min(10, "Teléfono inválido")
    .max(10, "Teléfono inválido"),

  address: z.object({
    street: z.string().min(1, "Calle requerida"),
    exterior: z.string().min(1, "Número exterior requerido"),
    interior: z.string().min(1, "Número exterior requerido"),
    neighborhood: z.string().min(1, "Colonia requerida"),
    city: z.string().min(1, "Ciudad requerida"),
    municipality: z.string().min(1, "Municipio requerido"),
    state: z.string().min(1, "Estado requerido"),
    country: z.string().min(1, "País requerido").optional(),
    postal_code: z
      .string()
      .length(5, "Código postal inválido"),
  }),
});

export type CustomerFormData = z.infer<typeof customerSchema>;