import { z } from "zod";

export const companyDetailSchema = z.object({
  legal_name: z.string().min(1),
  phone: z.string().min(1),
  website: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),

  street: z.string().min(1),
  exterior: z.string().min(1),
  interior: z.string().optional().or(z.literal("")),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  municipality: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  postal_code: z.string().min(1),

  tax_id: z.string().optional().or(z.literal("")),
});

export type CompanyFormValues = z.infer<typeof companyDetailSchema>;