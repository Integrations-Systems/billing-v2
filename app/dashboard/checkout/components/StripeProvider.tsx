"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import { useMemo } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StripeProvider({
  clientSecret,
  children,
}: {
  clientSecret: string;
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();

  const options = useMemo(
    () => ({
      clientSecret,
      appearance: {
        theme: (resolvedTheme === "dark" ? "night" : "stripe") as
          | "night"
          | "stripe",
      },
    }),
    [clientSecret, resolvedTheme]
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}