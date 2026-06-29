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

  async function handleSubmit(e: FormEvent) {
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
      console.error(error.message);
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
    </form>
  );
}