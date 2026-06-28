"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Home,
    FileText,
    Users,
    Settings,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            style={{ height: "-webkit-fill-available" }}

            className={`
                flex flex-col border-r bg-card items-stretch
                transition-all duration-300
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Header */}
            <div
                className={`flex h-16 items-center border-l px-4 ${collapsed ? "justify-center" : "justify-between"
                    }`}
            >
                {!collapsed && (
                    <h2 className="font-semibold">
                        Billing
                    </h2>
                )}

                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <PanelLeftOpen className="h-4 w-4" />
                    ) : (
                        <PanelLeftClose className="h-4 w-4" />
                    )}
                </Button>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-3">
                <TooltipProvider delayDuration={0}>
                    {links.map((link) => {
                        const Icon = link.icon;

                        const button = (
                            <Button
                                variant="ghost"
                                className={`w-full ${collapsed
                                    ? "justify-center px-0"
                                    : "justify-start"
                                    }`}
                                asChild
                            >
                                <Link href={link.href}>
                                    <Icon className="h-4 w-4 shrink-0" />

                                    {!collapsed && (
                                        <span className="ml-2">
                                            {link.title}
                                        </span>
                                    )}
                                </Link>
                            </Button>
                        );

                        if (!collapsed) {
                            return (
                                <div key={link.href}>
                                    {button}
                                </div>
                            );
                        }

                        return (
                            <Tooltip key={link.href}>
                                <TooltipTrigger asChild>
                                    {button}
                                </TooltipTrigger>

                                <TooltipContent side="right">
                                    {link.title}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </TooltipProvider>
            </nav>

            {/* Footer */}
            <div className="border-t p-4">
                {!collapsed && (
                    <p className="text-xs text-muted-foreground">
                        Billing v2.0.1
                    </p>
                )}
            </div>
        </aside>
    );
}