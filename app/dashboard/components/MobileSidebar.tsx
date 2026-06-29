"use client";

import Link from "next/link";
import {
  Home,
  FileText,
  Users,
  Settings,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Clientes",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Facturas",
    href: "/dashboard/invoices",
    icon: FileText,
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-0">
        {/* Accesibilidad requerida por Radix */}
        <SheetTitle className="sr-only">
          Menú de navegación
        </SheetTitle>

        <div className="flex h-full flex-col">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold">
              Billing
            </h2>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={link.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {link.title}
                  </Link>
                </Button>
              );
            })}
          </nav>

          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground">
              Billing v2.0.1
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}