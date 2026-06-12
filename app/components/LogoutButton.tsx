"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/");
    router.refresh();
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={logout}
    >
      Logout
    </Button>
  );
}