// app/api/create-payment-intent/route.ts

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { amount } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Stripe usa centavos
    currency: "mxn",
  });

  return Response.json({
    clientSecret: paymentIntent.client_secret,
  });
}