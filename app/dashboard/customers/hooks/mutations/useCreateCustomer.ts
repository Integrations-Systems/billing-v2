import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Customer } from "@/app/models/Customer";


export function useCreateCustomer() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (customer: Customer) => {
            const res: Response = await fetch(`/api/customers`, {
                method: "POST",
                body: JSON.stringify({
                    customer
                })
            });

            const data = await res.json();

            if (data.error) throw new Error(data.message || 'Error updating customer');

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
        },
    })
}
