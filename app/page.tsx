import AccStatus from "@/components/base/AccStatus";
import Slider from "@/components/base/Slider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: sesi, error } = await supabase.auth.getSession();
  {
    sesi?.session?.user == null ? redirect("/about") : <></>;
  }
  return (
    <>
      {sesi == null ? (
        <></>
      ) : (
        <div>
          <div className="bg-black justify-center">
            <AccStatus />
          </div>
          <div className="pt-10">
            <Slider />
          </div>
        </div>
      )}
    </>
  );
}
