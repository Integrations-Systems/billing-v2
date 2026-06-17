import { useQueryClient } from '@tanstack/react-query';
import CompanyInfo from './CompanyInfo'
import CompanyDetail from './CompanyDetail';
import { CompanyCertificates } from './CompanyCertificates';


export default function OnboardingView() {
    const queryClient = useQueryClient();
    const step = queryClient.getQueryData(['check-onboarding']);

    if(step === 0) return <CompanyInfo />
    if(step === 1) return <CompanyDetail />
    if(step === 2) return <CompanyCertificates />
}