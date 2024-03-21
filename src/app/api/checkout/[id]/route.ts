import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const checkoutSession = await stripe.checkout.sessions.retrieve(id);
  if (!checkoutSession) {
    return NextResponse.json(
      {
        error: "Could not find checkout session",
      },
      {
        status: 404,
      }
    );
  }

  if (checkoutSession.status !== "complete") {
    return NextResponse.json(
      {
        error: "Checkout session is not complete",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(null, { status: 200 });
}
