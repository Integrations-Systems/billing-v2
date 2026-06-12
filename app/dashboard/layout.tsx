import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="overflow-hidden bg-background h-full">
      <div className="flex h-full">
        <aside className="h-100 hidden md:flex"   style={{ height: "-webkit-fill-available" }}>
          <Sidebar />
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="p-2">
            <MobileSidebar />
          </header>

          <main className="flex-1 overflow-auto px-6 py-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}