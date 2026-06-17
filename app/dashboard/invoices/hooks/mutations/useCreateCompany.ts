import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Input = {
  name: string;
  image: File;
};

const STORAGE_KEY = "pending_org_creation";

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, image }: Input) => {
      // 1. leer estado previo
      const saved = localStorage.getItem(STORAGE_KEY);
      const draft = saved ? JSON.parse(saved) : null;

      let orgId = draft?.orgId;

      // 2. si no existe org → crearla
      if (!orgId) {
        const res = await fetch("/api/organizations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error creating organization");
        }

        console.log(data)

        orgId = data.organization.id;

        // guardar progreso
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            orgId,
            name,
          })
        );
      }

      // 3. subir logo (retry-safe)
      const formData = new FormData();
      formData.append("image", image);
      formData.append("organization_id", orgId);

      const resLogo = await fetch("/api/organizations/logo", {
        method: "POST",
        body: formData,
      });

      const logoData = await resLogo.json();

      if (!resLogo.ok) {
        throw new Error(
          logoData.message || "Error uploading logo"
        );
      }

      // 4. limpiar estado si todo salió bien
      localStorage.removeItem(STORAGE_KEY);

      return {
        organizationId: orgId,
        logo: logoData.logo,
      };
    },

    onSuccess: async () => {
      toast.success("Compañía creada correctamente");

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