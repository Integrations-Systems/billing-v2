"use client";

import { useEffect, useState } from "react";

const plans = [
  {
    name: "Basic",
    description: "Plan básico",
    priceId: process.env.NEXT_PUBLIC_BASIC_PRICE_ID!,
  },
  {
    name: "Pro",
    description: "Plan profesional",
    priceId: process.env.NEXT_PUBLIC_PRO_PRICE_ID!,
  },
];

export default function PricingPage() {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Handle redirect when URL is set
  useEffect(() => {
    if (redirectUrl) {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const subscribe = async (priceId: string) => {
    try {
      const response = await fetch("/api/create-subscription-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert(data.error || "Error al crear la suscripción");
        return;
      }

      setRedirectUrl(data.url);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error");
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        Elige tu plan
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold">
              {plan.name}
            </h2>

            <p className="text-muted-foreground mt-2">
              {plan.description}
            </p>

            <button
              onClick={() => subscribe(plan.priceId)}
              className="mt-6 w-full bg-black text-white rounded-lg py-3"
            >
              Suscribirme
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}