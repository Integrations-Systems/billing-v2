import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { certificatesSchema } from "../../schema/certificates.schema";

type FormData = z.infer<typeof certificatesSchema>;

export function useCreateSatFiles() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: FormData) => {
            const formData = new FormData();

            formData.append("cer", data.cerFile[0]);
            formData.append("key", data.keyFile[0]);
            formData.append("password", data.password);

            const res = await fetch("/api/sat-files", {
                method: "POST",
                body: formData,
            });

            const response = await res.json();

            if (!res.ok) {
                let message = "Error al cargar certificados";

                try {
                    const detail =
                        typeof response.detail === "string"
                            ? JSON.parse(response.detail)
                            : response.detail;

                    message = detail?.error ?? message;
                } catch {
                    message = response?.message ?? message;
                }

                throw new Error(message);
            }

            return response;
        },

        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ["sat-files"],
            });

            await fetch("/api/onboarding", {
                method: "PATCH",
            });

            queryClient.invalidateQueries({
                queryKey: ["check-onboarding"],
            });
        },
    });
}