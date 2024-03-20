import { REPLICATE_USCALE_MODEl } from "@/lib/constants";
import replicate from "@/lib/replicate";
import createSupabaseAdminClient from "@/lib/supabase/admin";
import { getBaseUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { PredictionStatus } from "../../../../../types/predictions";

type NSFWDetectionOutput = {
  output: {
    nsfw_detected: boolean;
  };
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as NSFWDetectionOutput;

  const predictionId = req.nextUrl.searchParams.get("id");
  const inputUrl = req.nextUrl.searchParams.get("input_url");

  if (!predictionId || !inputUrl) {
    return NextResponse.json(
      { message: "An error has occured." },
      { status: 500 }
    );
  }

  const isNSFW = body.output.nsfw_detected;

  const supabase = await createSupabaseAdminClient();

  if (isNSFW) {
    // Remove the image from the storage bucket
    await supabase.storage.from("predictions").remove([inputUrl]);
    const { error: updatePredictionError } = await supabase
      .from("predictions")
      .update({
        status: PredictionStatus.NSFW,
        input_url: null,
      })
      .eq("id", predictionId);
    if (updatePredictionError) {
      return NextResponse.json(
        { message: updatePredictionError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "NSFW" }, { status: 422 });
  }

  // Forward the request to the next webhook
  const webhookUrl = new URL(`${getBaseUrl()}/api/wh/uscale`);
  webhookUrl.searchParams.set("id", predictionId);

  console.log("NSFW passed!");
  const { error } = await replicate.predictions.create({
    version: REPLICATE_USCALE_MODEl,
    input: {
      image: inputUrl,
      scale: 2,
      face_enhance: false,
    },
    webhook: webhookUrl.toString(),
    webhook_events_filter: ["completed"],
  });

  if (error) {
    const { error: updatePredictionError } = await supabase
      .from("predictions")
      .update({
        status: PredictionStatus.FAILED,
      })
      .eq("id", predictionId);
    return NextResponse.json(
      { message: "An issue has occured with the AI model." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "OK" });
}
