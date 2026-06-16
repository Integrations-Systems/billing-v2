import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
    return useQuery({
        queryKey: ["customers"],
        queryFn: async () => {
            const res = await fetch("/api/customers");
            const data = await res.json();

            if(data.error) throw new Error(data);

            return data;
        }
    })
}