"use client";

import { useState } from "react";
import Image from "next/image";

import StripeProvider from "./StripeProvider";
import CheckoutForm from "./CheckoutForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

const PRICE_PER_STAMP = 1.5;

const PRESET_PACKAGES = [
  {
    stamps: 100,
    label: "Paquete Básico",
    image: "/coins/100-coins.png",
  },
  {
    stamps: 500,
    label: "Más vendido",
    image: "/coins/500-coins.png",
    featured: true,
  },
  {
    stamps: 1000,
    label: "Paquete Premium",
    image: "/coins/1000-coins.png",
  },
];

type Step = "select" | "checkout";

export default function CheckoutPage() {
  const [selectedStamps, setSelectedStamps] = useState<
    number | "custom" | null
  >(null);

  const [customStamps, setCustomStamps] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("select");

  const getFinalAmount = (): number => {
    if (selectedStamps === "custom") {
      return (Number(customStamps) || 0) * PRICE_PER_STAMP;
    }

    return (selectedStamps || 0) * PRICE_PER_STAMP;
  };

  const getStampsCount = (): number => {
    if (selectedStamps === "custom") {
      return Number(customStamps) || 0;
    }

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
      alert("La compra mínima es de 2 timbres.");
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

  if (step === "checkout" && clientSecret) {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="space-y-4">
            <Button
              variant="ghost"
              onClick={reset}
              className="w-fit"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cambiar paquete
            </Button>

            <div>
              <CardTitle className="text-3xl">
                Completa tu compra
              </CardTitle>

              <CardDescription>
                Finaliza el pago de tus timbres fiscales.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Timbres
                  </span>

                  <span className="font-medium">
                    {getStampsCount()}
                  </span>
                </div>

                <div className="flex justify-between mt-3">
                  <span className="text-muted-foreground">
                    Precio unitario
                  </span>

                  <span>${PRICE_PER_STAMP} MXN</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${getFinalAmount()} MXN</span>
                </div>
              </CardContent>
            </Card>

            <StripeProvider clientSecret={clientSecret}>
              <CheckoutForm />
            </StripeProvider>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-10">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>

            <CardTitle className="text-4xl md:text-5xl font-bold">
              Adquirir Timbres Fiscales
            </CardTitle>

            <CardDescription className="max-w-2xl mx-auto mt-4 text-base">
              Compra únicamente los timbres que necesitas.
              Sin contratos, sin permanencia y con activación
              inmediata.
            </CardDescription>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Pago seguro
              </div>

              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Activación inmediata
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Sin expiración
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {PRESET_PACKAGES.map((pkg) => {
              const totalPrice = pkg.stamps * PRICE_PER_STAMP;
              const isSelected =
                selectedStamps === pkg.stamps;

              return (
                <Card
                  key={pkg.stamps}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    pkg.featured
                      ? "border-primary shadow-lg"
                      : ""
                  } ${
                    isSelected
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                >
                  {pkg.featured && (
                    <Badge className="absolute top-4 right-4">
                      <Star className="h-3 w-3 mr-1" />
                      Más vendido
                    </Badge>
                  )}

                  <div className="relative h-44 border-b bg-muted/20">
                    <Image
                      src={pkg.image}
                      alt={`${pkg.stamps} timbres`}
                      fill
                      className="object-contain p-6"
                    />
                  </div>

                  <CardContent className="p-6">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {pkg.label}
                    </div>

                    <h3 className="text-4xl font-black mt-2">
                      {pkg.stamps}
                    </h3>

                    <p className="text-muted-foreground text-sm">
                      Timbres fiscales
                    </p>

                    <div className="mt-6">
                      <div className="text-4xl font-black">
                        ${totalPrice}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        MXN
                      </div>
                    </div>

                    <Separator className="my-5" />

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Activación inmediata
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Uso permanente
                      </div>

                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Pago seguro
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6"
                      disabled={loading}
                      onClick={() =>
                        handleSelectPackage(pkg.stamps)
                      }
                    >
                      {loading &&
                      selectedStamps === pkg.stamps ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Comprar ahora"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}

            <Card
              className={`border-2 border-dashed transition-all hover:border-primary hover:shadow-lg ${
                selectedStamps === "custom"
                  ? "border-primary"
                  : ""
              }`}
            >
              <div className="relative h-44 border-b bg-muted/20">
                <Image
                  src="/coins/custom.png"
                  alt="Personalizado"
                  fill
                  className="object-contain p-6"
                />
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold">
                  Personalizado
                </h3>

                <p className="text-muted-foreground mt-2">
                  Compra exactamente la cantidad de timbres
                  que necesitas.
                </p>

                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() =>
                    setSelectedStamps("custom")
                  }
                >
                  Personalizar
                </Button>
              </CardContent>
            </Card>
          </div>

          {selectedStamps === "custom" && (
            <Card className="max-w-xl mx-auto shadow-md">
              <CardHeader>
                <CardTitle>
                  Cantidad personalizada
                </CardTitle>

                <CardDescription>
                  Ingresa la cantidad de timbres que deseas
                  adquirir.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Ej. 250"
                  value={customStamps}
                  onChange={(e) => {
                    const value =
                      e.target.value.replace(/\D/g, "");
                    setCustomStamps(value);
                  }}
                />

                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex justify-between">
                      <span>Timbres</span>
                      <span>{customStamps || 0}</span>
                    </div>

                    <div className="flex justify-between mt-2">
                      <span>Precio unitario</span>
                      <span>${PRICE_PER_STAMP}</span>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between font-bold text-xl">
                      <span>Total</span>
                      <span>
                        ${getFinalAmount()} MXN
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {Number(customStamps) > 0 &&
                  Number(customStamps) < 2 && (
                    <p className="text-sm text-destructive">
                      La compra mínima es de 2 timbres.
                    </p>
                  )}

                <Button
                  className="w-full"
                  disabled={
                    loading || Number(customStamps) < 2
                  }
                  onClick={handleCustomSubmit}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Procesando...
                    </>
                  ) : (
                    `Comprar ${customStamps || 0} timbres`
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}