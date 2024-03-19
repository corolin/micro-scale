import createSupabaseServerClient from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const predictionId = searchParams.get("id");

  if (!predictionId) {
    return {
      status: 400,
      body: "An error has occured.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("predictions")
    .select()
    .eq("id", predictionId)
    .single();

  if (error) {
    return {
      status: 500,
      body: error.message,
    };
  }

  return NextResponse.json({ prediction: data });
}
