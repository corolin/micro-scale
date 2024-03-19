import PreviewTemplate from "@/features/upscale/templates/preview";
import getUserSession from "@/lib/actions/get-user-session";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function retrievePrediction(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("predictions")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    return redirect("/not-found");
  }

  return data;
}

export default async function Page(props: { params: { id: string } }) {
  const { data } = await getUserSession();

  const prediction = await retrievePrediction(props.params.id);

  if (!data.session) {
    return redirect("/sign-in");
  }

  return <PreviewTemplate prediction={prediction} />;
}
