"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/dashboard");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex justify-center">
      <div className="max-w-md rounded-lg border p-8 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />

        <h1 className="mb-2 text-3xl font-bold">
          ¡Pago realizado con éxito!
        </h1>

        <p className="text-muted-foreground">
          Tu compra fue procesada correctamente.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Serás redirigido al dashboard en{" "}
          <span className="font-semibold">{seconds}</span> segundos...
        </p>
      </div>
    </div>
  );
}