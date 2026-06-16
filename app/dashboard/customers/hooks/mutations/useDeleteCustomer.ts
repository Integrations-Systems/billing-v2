// hooks/mutations/useDeleteCustomer.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (customerId: string) => {
            const res = await fetch(`/api/customers/${customerId}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (data.error) {
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
        },
    });
}