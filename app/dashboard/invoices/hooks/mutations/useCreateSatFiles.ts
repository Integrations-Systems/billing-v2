import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useCreateSatFiles() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData()

            formData.append('cer', data.cerFile[0])
            formData.append('key', data.keyFile[0])
            formData.append('password', data.password)

            const res = await fetch('/api/sat-files', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) {
                const response = await res.json();
                const detail = JSON.parse(response.detail);
                throw new Error(detail.error)
            }

            return res.json()
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ['sat-files'] })
            await fetch('/api/onboarding', {
                method: 'PATCH',
            }).then(() => {
                queryClient.invalidateQueries({ queryKey: ['check-onboarding'] });
            });
        },
    })

}