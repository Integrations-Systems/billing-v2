import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Customer } from "@/app/models/Customer";


export function useUpdateCustomer() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (customer: Customer) => {
            const res: Response = await fetch(`/api/customers/${customer.id}`, {
                method: "PUT",
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
