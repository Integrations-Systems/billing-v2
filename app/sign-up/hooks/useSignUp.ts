// hooks/useLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignUpFormData } from "@/app/sign-up/schemas/register-schema";
import { useRouter } from "next/navigation";

export function useSignUp() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: SignUpFormData) => {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      return json;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_info"],
      });
      router.push("/login")
    },
  });
}