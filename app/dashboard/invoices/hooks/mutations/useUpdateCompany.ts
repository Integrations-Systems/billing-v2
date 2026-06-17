import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CompanyFormValues } from "../../schema/company.detail.schema";

async function updateCompany(data: CompanyFormValues) {
  const res = await fetch("/api/organizations", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Error updating company");
  }

  return json;
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompany,

    onSuccess: async () => {
      toast.success("Compañía actualizada correctamente");

      await fetch("/api/onboarding", {
        method: "PATCH",
      });

      queryClient.invalidateQueries({
        queryKey: ["check-onboarding"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}