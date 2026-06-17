import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  image: z
    .instanceof(File, {
      message: "La imagen es obligatoria",
    }),
});

export type CompanyFormValues = z.infer<typeof companySchema>;