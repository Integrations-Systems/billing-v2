import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const isAuthenticated = !!token;

  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <Link className="text-lg font-bold" href="/">
        Billing v2.0.1
      </Link>

      <div className="flex gap-2 items-center">
        {isAuthenticated ? (
          <>
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={36}
              height={36}
              className="rounded-full border"
            />

            <LogoutButton />
          </>
        ) : (
          <>
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild variant="outline" size="sm">
              <Link href="/sign-up">Registrarse</Link>
            </Button>
          </>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}