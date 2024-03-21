import stripe from "@/lib/stripe";
import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      {
        error: "You must be logged in to checkout",
      },
      { status: 401 }
    );
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "x5 µScale Credits",
          },
          unit_amount: 500, // $5.00
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: session.user.id,
      credits: 5,
    },
    mode: "payment",
    success_url: `${req.nextUrl.origin}/buy?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.nextUrl.origin}/buy?canceled=true`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
