// hooks/useLogin.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginFormData } from "@/app/login/schemas/login-schema";
import { useRouter } from "next/navigation";

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.message);
      }

      return json;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_credentials"],
      });
      router.push("/dashboard");
      router.refresh();
    },
  });
}