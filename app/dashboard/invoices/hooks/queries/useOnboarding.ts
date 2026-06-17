import { useQuery } from "@tanstack/react-query";

export const useGetStatusOnboarding = () => {
    return useQuery({
        queryKey: ["check-onboarding"],
        queryFn: async () => {
            const res = await fetch("/api/onboarding");
            const data = await res.json();
            
            if(data.onboarding_status.current_step === "step_1") return 0;

            if(data.onboarding_status.current_step === "step_2") return 1;

            if(data.onboarding_status.current_step === "step_3") return 2;

            return 3;
        }
    })
}