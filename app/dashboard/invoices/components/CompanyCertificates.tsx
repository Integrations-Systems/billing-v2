'use client';

import { certificatesSchema } from '../schema/certificates.schema';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useCreateSatFiles } from '../hooks/mutations/useCreateSatFiles';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';

type FormData = z.infer<typeof certificatesSchema>

export function CompanyCertificates() {

    const { mutate, isError, error, isPending, data } = useCreateSatFiles();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(certificatesSchema),
    })

    const onSubmit = async (dataFile) => {
        mutate(dataFile)
    };

    return (
        <form
            className='flex flex-col w-fit gap-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            {isError && <p className='text-red-500'>{error.message}
            </p>}
            <Input type="file" accept=".cer" {...register("cerFile")} />
            {errors.cerFile?.message && <p className="text-red-500 text-sm">{errors.cerFile.message as string}</p>}
            <Input type="file" accept=".key" {...register("keyFile")} />
            {errors.keyFile?.message && <p className="text-red-500 text-sm">{errors.keyFile.message as string}</p>}
            <Input type="password" placeholder='Contraseña' {...register("password")} />
            {errors.password?.message && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
            {isPending ?
                <Button
                    disabled
                >
                    <Spinner data-icon="inline-start" />
                    Cargando...
                </Button>
                :
                <Button
                    type="submit"
                >
                    Guardar
                </Button>}
        </form>
    )
}