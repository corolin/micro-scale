import { env } from "@/env.mjs";
import stripe from "@/lib/stripe";
import createSupabaseAdminClient from "@/lib/supabase/admin";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 400,
      }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: {
          user_id: string;
          credits: string;
        };
      };

      const userId = completedEvent.metadata.user_id;
      const credits = parseInt(completedEvent.metadata.credits);

      console.log(completedEvent.metadata);

      const supabase = await createSupabaseAdminClient();

      // We can update the credits now for the user
      const { data: creditRow, error: creditRowError } = await supabase
        .from("credits")
        .select()
        .eq("user_id", userId)
        .single();

      if (!creditRow || creditRowError) {
        return NextResponse.json(
          {
            error: "Could not find credits for the user",
          },
          {
            status: 400,
          }
        );
      }

      const { error: updateCreditsError } = await supabase
        .from("credits")
        .update({
          amount: Number(creditRow.amount! + credits),
        })
        .eq("user_id", userId);

      if (updateCreditsError) {
        console.log(updateCreditsError);
        return NextResponse.json(
          {
            error: "Could not update credits for the user",
          },
          {
            status: 400,
          }
        );
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  console.log("Checkout has been trigered");

  return NextResponse.json(null, { status: 200 });
}
