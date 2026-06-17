'use client'
import { useGetStatusOnboarding } from "../hooks/queries/useOnboarding"
import OnboardingView from "./OnboardingView";

export default function InvoicesView(){

    const { data, isLoading } = useGetStatusOnboarding();

    if(isLoading) return <p>Cargando...</p>

    

    return (
        <>
            {data === 3 ? 
                <p>Facturas</p> :
                <OnboardingView />
            }

        </>
    )

}