"use client";

import { useState } from "react";
import StripeProvider from "./StripeProvider";
import CheckoutForm from "./CheckoutForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

// Definimos el costo por timbre individual
const PRICE_PER_STAMP = 5;

// Configuramos los paquetes preestablecidos de timbres
const PRESET_PACKAGES = [
  { stamps: 100, label: "Paquete Básico" },
  { stamps: 500, label: "Paquete Negocio" },
  { stamps: 1000, label: "Paquete Premium" },
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
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Adquirir Timbres</CardTitle>
        <CardDescription className="text-center">
          Cada timbre fiscal tiene un costo fijo de ${PRICE_PER_STAMP} MXN.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Lista de Paquetes Preestablecidos */}
        <div className="grid gap-3">
          {PRESET_PACKAGES.map((pkg) => {
            const isSelected = selectedStamps === pkg.stamps;
            const totalPrice = pkg.stamps * PRICE_PER_STAMP;

            return (
              <button
                key={pkg.stamps}
                disabled={loading}
                onClick={() => handleSelectPackage(pkg.stamps)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-medium text-muted-foreground">{pkg.label}</div>
                  <div className="text-lg font-bold flex items-center gap-1.5">
                    {pkg.stamps} Timbres
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-primary inline" />}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold">${totalPrice}</div>
                  <div className="text-xs text-muted-foreground">${PRICE_PER_STAMP}/u</div>
                </div>
              </button>
            );
          })}

          {/* Botón para activar cantidad personalizada */}
          <Button
            variant={selectedStamps === "custom" ? "default" : "outline"}
            onClick={() => setSelectedStamps("custom")}
            disabled={loading}
            className="w-full h-12 text-base font-medium border-dashed"
          >
            ✏️ Otra cantidad de timbres
          </Button>
        </div>

        {/* Input para Cantidad Personalizada */}
        {selectedStamps === "custom" && (
          <div className="space-y-4 pt-3 border-t animate-in fade-in duration-200">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">¿Cuántos timbres necesitas?</label>
              <div className="flex gap-3 items-center">
                <Input
                  type="number"
                  placeholder="Ej. 250"
                  value={customStamps}
                  onChange={(e) => setCustomStamps(e.target.value)}
                  className="h-11 text-base"
                  disabled={loading}
                  min={2}
                />
                <div className="text-right min-w-[90px]">
                  <div className="text-xs text-muted-foreground">Total:</div>
                  <div className="text-lg font-bold">${getFinalAmount()}</div>
                </div>
              </div>
              {Number(customStamps) > 0 && Number(customStamps) < 2 && (
                <p className="text-sm text-destructive">
                  La compra mínima es de 2 timbres ($10 MXN).
                </p>
              )}
            </div>

            <Button
              className="w-full h-11 text-base font-medium"
              onClick={handleCustomSubmit}
              disabled={loading || Number(customStamps) < 2}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                `Comprar ${customStamps || 0} timbres`
              )}
            </Button>
          </div>
        )}

        {/* Loader global */}
        {loading && selectedStamps !== "custom" && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-1 animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generando orden de pago...
          </div>
        )}
      </CardContent>
    </Card>
  );
}