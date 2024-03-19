import UpscaleProvider from "@/features/upscale/context";
import UploadTemplate from "@/features/upscale/templates/upload";
import getUserSession from "@/lib/actions/get-user-session";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data } = await getUserSession();

  if (!data.session) {
    return redirect("/sign-in");
  }

  return (
    <UpscaleProvider>
      <UploadTemplate />
    </UpscaleProvider>
  );
}
