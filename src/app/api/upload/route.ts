import getUserSession from "@/lib/actions/get-user-session";
import { REPLICATE_NSFW_MODEL } from "@/lib/constants";
import replicate from "@/lib/replicate";
import createSupabaseAdminClient from "@/lib/supabase/admin";
import { getBaseUrl } from "@/lib/utils";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { PredictionStatus } from "../../../../types/predictions";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("image") as File;

  if (!file) {
    return NextResponse.json({ message: "No file selected" }, { status: 400 });
  }

  try {
    const supabase = await createSupabaseAdminClient();

    const {
      data: { session },
      error: sessionError,
    } = await getUserSession();

    if (sessionError) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session?.user.id!;
    const { data: userCredits } = await supabase
      .from("credits")
      .select()
      .eq("user_id", userId)
      .single();

    if (!userCredits || userCredits?.amount === 0) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    // Remove one credit from the user
    const { error: updateCreditsError } = await supabase
      .from("credits")
      .update({ amount: userCredits.amount! - 1 })
      .eq("user_id", userId);

    if (updateCreditsError) {
      return NextResponse.json(
        { error: updateCreditsError.message },
        { status: 500 }
      );
    }
    revalidatePath("/upscale", "layout");

    // #1 Upload the image to a Supabase storage bucket
    const { data: uploadedImage, error: uploadError } = await supabase.storage
      .from("predictions")
      .upload(`microScale-${nanoid()}.${file.type.split("/")[1]}`, file, {
        contentType: file.type,
      });
    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("predictions").getPublicUrl(uploadedImage.path);
    if (!publicUrl) {
      return NextResponse.json(
        { error: "Failed to get the public URL" },
        { status: 500 }
      );
    }
    // #2 Create a new record in the database with the image URL and the user id for future reference

    const { error: insertPredictionError } = await supabase
      .from("predictions")
      .insert({
        user_id: userId,
        input_url: publicUrl,
        status: PredictionStatus.PROCESSING,
      });
    if (insertPredictionError) {
      return NextResponse.json(
        { error: insertPredictionError.message },
        { status: 500 }
      );
    }

    const { data: newPrediction } = await supabase
      .from("predictions")
      .select()
      .eq("input_url", publicUrl)
      .eq("user_id", userId)
      .single();

    if (!newPrediction) {
      return NextResponse.json(
        { error: "Failed to retrieve the new prediction" },
        { status: 404 }
      );
    }

    // #3 Trigger the prediction process via a webhook
    const webhookUrl = new URL(`${getBaseUrl()}/api/wh/nsfw`);
    webhookUrl.searchParams.set("id", newPrediction.id.toString());
    webhookUrl.searchParams.set("input_url", publicUrl);

    /**
     * ! UNCOMMENT THIS CODE TO ENABLE THE REPLICATE API
     */

    // const { error: replicateError } = await createReplicatePrediction({
    //   imageUrl: publicUrl,
    //   webhookUrl,
    // });

    // if (replicateError) {
    //   return NextResponse.json(
    //     { error: replicateError.message },
    //     { status: 500 }
    //   );
    // }

    /**
     * ! UNCOMMENT THIS CODE TO ENABLE THE REPLICATE API
     */

    return NextResponse.json({
      message: "File uploaded",
      id: newPrediction.id,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }
  }
}

type PredictionOptions = {
  imageUrl: string;
  webhookUrl: URL;
};
async function createReplicatePrediction({
  imageUrl,
  webhookUrl,
}: PredictionOptions) {
  return await replicate.predictions.create({
    version: REPLICATE_NSFW_MODEL,
    input: {
      image: imageUrl,
    },
    webhook: webhookUrl.toString(),
    webhook_events_filter: ["completed"],
  });
}
