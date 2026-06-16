import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import { Toaster } from "@/components/ui/sonner"

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    return (
        <div className="flex min-h-[calc(100dvh-72px)]">  
        <Toaster />    
        <aside className="hidden md:flex">
            <Sidebar />
        </aside>

            <div className="flex flex-1 flex-col">
                <header className="p-2">
                    <MobileSidebar />
                </header>

                <main className="flex-1 px-6 py-2">
                    {children}
                </main>
            </div>
        </div>
    );
}