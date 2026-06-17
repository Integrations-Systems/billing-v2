import { z } from "zod";

export const certificatesSchema = z.object({
  cerFile: z
    .any()
    .refine((files) => files?.length === 1, "El archivo .cer es requerido")
    .refine(
      (files) => files?.[0]?.name.endsWith(".cer"),
      "Debe ser un archivo .cer"
    ),

  keyFile: z
    .any()
    .refine((files) => files?.length === 1, "El archivo .key es requerido")
    .refine(
      (files) => files?.[0]?.name.endsWith(".key"),
      "Debe ser un archivo .key"
    ),

  password: z
    .string()
    .min(1, "La contraseña es requerida"),
});