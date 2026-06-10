import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 py-4">
      <Link className="text-lg font-bold" href="/">
        Billing v2.0.1
      </Link>

      <div className="flex gap-2 items-center">
        <Button asChild size="sm">
          <Link href="/login">Login</Link>
        </Button>

        <Button asChild variant="outline" size="sm">
          <Link href="/sign-up">Registrarse</Link>
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}