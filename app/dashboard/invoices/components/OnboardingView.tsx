import { useQueryClient } from '@tanstack/react-query';
import CompanyInfo from './CompanyInfo'


export default function OnboardingView() {
    const queryClient = useQueryClient();
    const step = queryClient.getQueryData(['check-onboarding']);

    if(step === 0) return <CompanyInfo />
    if(step === 1) return <p>Step 2</p>
    if(step === 2) return <p>Step 3</p>
}