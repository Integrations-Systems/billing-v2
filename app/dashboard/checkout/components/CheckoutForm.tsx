"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
  ExpressCheckoutElement,
} from "@stripe/react-stripe-js";
import { StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";

import { FormEvent, useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  async function handleSubmit(e: FormEvent) {
    setErrorMessage(undefined)
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message)
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <ExpressCheckoutElement onConfirm={(event: StripeExpressCheckoutElementConfirmEvent) => {
        throw new Error("Function not implemented.");
      } } />
      <PaymentElement />

      <Button
        disabled={!stripe || loading}
        className="mt-4 border px-4 py-2"
      >
        {loading ? "Procesando compra..." : "Pagar"}
      </Button>
      <p className="py-4 text-red-500">{errorMessage ? errorMessage : null}</p>
    </form>
  );
}