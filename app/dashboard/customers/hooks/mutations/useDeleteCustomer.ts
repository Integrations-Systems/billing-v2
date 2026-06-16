import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/customers/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(
                    data.message || "Error deleting customer"
                );
            }

            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["customers"],
            });

            toast.success("Cliente eliminado correctamente", { position: "top-center" });
        },

        onError: (error: Error) => {
            toast.error(error.message, { position: "top-center" });
        },
    });
}