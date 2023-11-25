import AccStatus from "@/components/base/AccStatus";
import MembershipForm from "@/components/base/MembershipForm";
import Navbar from "@/components/base/Navbar";
import App from "@/components/base/Slider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function About() {
  const supabase = createServerComponentClient({ cookies });
  const { data: sesi, error } = await supabase.auth.getSession();
  {
    sesi?.session?.user == null ? <></> : redirect("/");
  }
  return (
    <>
      <div className="justify-center min-h-screen">
        <p className="mt-5 font-black text-center text-3xl md:text-5xl">TAKE YOUR FITNESS LEVEL TO THE NEXT</p>
        <div className="justify-center flex pb-5">
          <App />
        </div>
      </div>
    </>
  );
}
