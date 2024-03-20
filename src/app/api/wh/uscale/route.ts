import createSupabaseAdminClient from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";
import { PredictionStatus } from "../../../../../types/predictions";

type UScaleDetectionOutput = {
  output: string;
};
export async function POST(req: NextRequest) {
  const body = (await req.json()) as UScaleDetectionOutput;
  const predictionId = req.nextUrl.searchParams.get("id");

  if (!predictionId) {
    return NextResponse.json(
      { message: "An error has occured." },
      { status: 500 }
    );
  }

  const supabase = await createSupabaseAdminClient();

  if (!body.output) {
    const { error: updatePredictionError } = await supabase
      .from("predictions")
      .update({
        status: PredictionStatus.FAILED,
      })
      .eq("id", predictionId);
    if (updatePredictionError) {
      return NextResponse.json(
        { message: updatePredictionError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }

  const { error: updatePredictionError } = await supabase
    .from("predictions")
    .update({
      status: PredictionStatus.SUCCESS,
      output_url: body.output,
    })
    .eq("id", predictionId);

  if (updatePredictionError) {
    return NextResponse.json(
      { message: updatePredictionError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Success" });
}
