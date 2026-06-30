"use client";

import { useState } from "react";
import StripeProvider from "./StripeProvider";
import CheckoutForm from "./CheckoutForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

// Definimos el costo por timbre individual
const PRICE_PER_STAMP = 1.5;

// Configuramos los paquetes preestablecidos de timbres
import Image from "next/image";

const PRESET_PACKAGES = [
  {
    stamps: 100,
    label: "Paquete Básico",
    image: "/coins/100-coins.png",
  },
  {
    stamps: 500,
    label: "Paquete Negocio",
    image: "/coins/500-coins.png",
  },
  {
    stamps: 1000,
    label: "Paquete Premium",
    image: "/coins/1000-coins.png",
  },
];

type Step = "select" | "checkout";

export default function CheckoutPage() {
  const [selectedStamps, setSelectedStamps] = useState<number | "custom" | null>(null);
  const [customStamps, setCustomStamps] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("select");

  // Calculamos el monto final según la selección
  const getFinalAmount = (): number => {
    if (selectedStamps === "custom") {
      return (Number(customStamps) || 0) * PRICE_PER_STAMP;
    }
    return (selectedStamps || 0) * PRICE_PER_STAMP;
  };

  const getStampsCount = (): number => {
    if (selectedStamps === "custom") return Number(customStamps) || 0;
    return selectedStamps || 0;
  };

  const createPaymentIntent = async (totalStamps: number) => {
    if (totalStamps < 2) {
      return;
    }

    const finalAmount = totalStamps * PRICE_PER_STAMP;

    setLoading(true);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          metadata: {
            stamps: totalStamps,
          },
        }),
      });

      const data = await res.json();
      setClientSecret(data.clientSecret);
      setStep("checkout");
    } catch (err) {
      console.error("Error creando payment intent:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPackage = (stamps: number) => {
    setSelectedStamps(stamps);
    createPaymentIntent(stamps);
  };

  const handleCustomSubmit = () => {
    const stamps = Number(customStamps);

    if (!stamps || stamps < 2) {
      alert("La compra mínima es de 2 timbres ($10 MXN)");
      return;
    }

    createPaymentIntent(stamps);
  };

  const reset = () => {
    setSelectedStamps(null);
    setCustomStamps("");
    setClientSecret("");
    setStep("select");
  };

  // 🧾 STEP 2: Checkout Stripe
  if (step === "checkout" && clientSecret) {
    return (
      <Card className="w-full shadow-md">
        <CardHeader>
          <Button
            variant="ghost"
            size="lg"
            onClick={reset}
            className="w-fit"
          >
            <ArrowLeft className="h-4 w-4" /> Cambiar paquete
          </Button>
          <CardTitle className="text-xl font-bold">Completa tu compra</CardTitle>
          <CardDescription>
            Estás adquiriendo <span className="font-semibold text-foreground">{getStampsCount()} timbres</span> por un total de:
          </CardDescription>
          <div className="text-2xl font-bold text-primary pt-1">
            ${getFinalAmount()} MXN
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <StripeProvider clientSecret={clientSecret}>
            <CheckoutForm />
          </StripeProvider>

        </CardContent>
      </Card>
    );
  }

  // 🧾 STEP 1: Select amount of stamps
  return (
    <Card className="w-full max-w-6xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Adquirir Timbres
        </CardTitle>
        <CardDescription className="text-center">
          Cada timbre fiscal tiene un costo fijo de ${PRICE_PER_STAMP} MXN.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Paquetes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRESET_PACKAGES.map((pkg) => {
            const isSelected = selectedStamps === pkg.stamps;
            const totalPrice = pkg.stamps * PRICE_PER_STAMP;

            return (
              <button
                key={pkg.stamps}
                disabled={loading}
                onClick={() => handleSelectPackage(pkg.stamps)}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${isSelected
                  ? "border-primary ring-2 ring-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
                  }`}
              >
                {/* Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                )}

                {/* Imagen */}
                {/* Imagen */}
                <div className="relative h-36 border-b bg-muted/30 flex items-center justify-center">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.stamps} timbres`}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Contenido */}
                <div className="p-5 space-y-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {pkg.label}
                  </div>

                  <h3 className="text-3xl font-bold">
                    {pkg.stamps}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Timbres fiscales
                  </p>

                  <div className="pt-3 border-t">
                    <div className="text-3xl font-extrabold">
                      ${totalPrice}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${PRICE_PER_STAMP} por timbre
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Card personalizada */}
          <button
            onClick={() => setSelectedStamps("custom")}
            disabled={loading}
            className={`rounded-2xl border-2 border-dashed transition-all hover:border-primary hover:bg-primary/5 overflow-hidden ${selectedStamps === "custom"
              ? "border-primary bg-primary/5"
              : ""
              }`}
          >
            <div className="h-36 border-b bg-muted/30 flex items-center justify-center">
              <Image
                src="/coins/custom.png"
                alt="Cantidad personalizada"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            <div className="min-h-[184px] flex flex-col items-center justify-center gap-4 p-6">
              <h3 className="text-xl font-bold">
                Cantidad personalizada
              </h3>

              <p className="text-sm text-muted-foreground text-center">
                Elige exactamente los timbres que necesitas.
              </p>
            </div>
          </button>
        </div>

        {/* Formulario custom */}
        {selectedStamps === "custom" && (
          <div className="max-w-lg mx-auto rounded-2xl border p-6 space-y-4 animate-in fade-in">
            <label className="text-sm font-medium">
              ¿Cuántos timbres necesitas?
            </label>

            <div className="flex gap-3">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Ej. 250"
                value={customStamps}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setCustomStamps(value);
                }}
              />

              <div className="min-w-[100px] text-right">
                <div className="text-xs text-muted-foreground">
                  Total
                </div>
                <div className="font-bold text-xl">
                  ${getFinalAmount()}
                </div>
              </div>
            </div>

            {Number(customStamps) > 0 &&
              Number(customStamps) < 2 && (
                <p className="text-sm text-destructive">
                  La compra mínima es de 2 timbres ($10 MXN).
                </p>
              )}

            <Button
              className="w-full"
              onClick={handleCustomSubmit}
              disabled={loading || Number(customStamps) < 2}
            >
              Comprar {customStamps || 0} timbres
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}