"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Zap,
  BarChart3,
  Crown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Basic",
    description: "Ideal para comenzar",
    price: "$99",
    period: "/mes",
    icon: Zap,
    priceId: process.env.NEXT_PUBLIC_BASIC_PRICE_ID!,
    features: [
      "Facturación ilimitada",
      "Panel administrativo",
      "Soporte por correo",
      "Reportes básicos",
    ],
  },
  {
    name: "Pro",
    description: "Para negocios en crecimiento",
    price: "$499",
    period: "/mes",
    icon: Crown,
    highlighted: true,
    priceId: process.env.NEXT_PUBLIC_PRO_PRICE_ID!,
    features: [
      "Todo lo incluido en Basic",
      "Reportes avanzados",
      "Métricas en tiempo real",
      "Soporte prioritario",
      "Integraciones premium",
    ],
  },
];

export default function PricingPage() {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  const subscribe = async (priceId: string) => {
    try {
      setLoadingPlan(priceId);

      const response = await fetch(
        "/api/create-subscription-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al crear la suscripción");
        return;
      }

      setRedirectUrl(data.url);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <BarChart3 className="w-4 h-4 mr-2" />
          Planes y precios
        </Badge>

        <h1 className="text-5xl font-bold tracking-tight">
          Elige el plan ideal para ti
        </h1>

        <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
          Comienza con el plan Basic o escala al Pro para
          obtener funcionalidades avanzadas.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
            <Card
              key={plan.name}
              className={`relative overflow-visible transition-all duration-300 hover:shadow-xl ${plan.highlighted
                  ? "border-primary shadow-lg scale-[1.02]"
                  : ""
                }`}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 right-4">
                  Más popular
                </Badge>
              )}

              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.description}
                    </CardDescription>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-5xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => subscribe(plan.priceId)}
                  disabled={loadingPlan === plan.priceId}
                >
                  {loadingPlan === plan.priceId
                    ? "Procesando..."
                    : `Suscribirme a ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}