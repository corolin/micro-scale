import getUserSession from "@/lib/actions/get-user-session";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data } = await getUserSession();

  if (!data.session) {
    return redirect("/sign-in");
  }

  return <div>Page</div>;
}
