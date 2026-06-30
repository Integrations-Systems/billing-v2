import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import { Badge } from "@/components/ui/badge";

import decodeJwt from "@/app/utils/decodeJwt";
import { Label } from "@/components/ui/label";
import { Jwt } from "@/app/models/Jwt";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const jwtValue: Jwt | null = decodeJwt(String(token?.value));

  const isAuthenticated = !!token;

  return (
    <header className="relative overflow-hidden border-b bg-background">
      {/* Glow izquierdo */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -left-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

      {/* Glow derecho */}
      <div
        className="
          pointer-events-none
          absolute
          -top-40
          -right-40
          h-[500px]
          w-[500px]
          rounded-full
          bg-fuchsia-500/15
          blur-[120px]
        "
      />

      {/* Líneas decorativas */}
      <div className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-cyan-500/80 to-transparent" />
      <div className="absolute top-0 right-0 h-px w-1/3 bg-gradient-to-l from-fuchsia-500/80 to-transparent" />

      <div className="relative flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          Billing v2.0.1
        </Link>

        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
                <Badge variant="secondary">
                  {jwtValue?.subscription_plan ?? 'Basic'}
                </Badge>

                <Button asChild size="sm">
                  <Link href="/dashboard/pricing">
                    Ver planes
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-3 rounded-xl border px-3 py-2">
                <Image
                  src="/coin.png"
                  alt="Billpoint"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Badge variant="secondary">
                  {jwtValue?.tokens ?? 0} Billpoints
                </Badge>

                <Button asChild size="sm">
                  <Link href="/dashboard/checkout">
                    Comprar más
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-3 rounded-xl border bg-background/80 px-3 py-2 backdrop-blur-sm">
                <Image
                  src="/avatar.jpg"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border"
                />

                <div className="flex flex-col">
                  <Label className="font-medium">
                    {jwtValue?.first_name} {jwtValue?.last_name}
                  </Label>

                  <Label className="text-xs text-muted-foreground">
                    {jwtValue?.email}
                  </Label>
                </div>
              </div>

              <LogoutButton />
            </>
          ) : (
            <>
              <Button asChild size="sm">
                <Link href="/login">Iniciar sesión</Link>
              </Button>

              <Button asChild variant="outline" size="sm">
                <Link href="/sign-up">Registrarse</Link>
              </Button>
            </>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}