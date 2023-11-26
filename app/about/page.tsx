import Slider from "@/components/base/Slider";
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
      <div className="w-full flex-center flex-col justify-center">
        <div className="bg-black w-full flex-col justify-center items-start">
          <div className="flex container flex-col items-start py-20 sm:py-32 md:py-48">
            <h1 className="inline-block text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl md:text-6xl text-left align-middle font-serif">TAKE YOUR FITNESS LEVEL TO THE NEXT!</h1>
          </div>
        </div>
        <div className="flex container flex-col items-center">
          <h2 className="text-xl font-extrabold leading-[1.15] sm:text-3xl mt-16 mb-2">INDULGE YOURSELF IN OVER 8,000 EXCITING GROUP CLASSES EVERY MONTH</h2>
          <h1 className="text-4xl font-extrabold leading-[1.15] sm:text-6xl mt-4 mb-6">OUR CLASSES</h1>
          <Slider />
        </div>
      </div>
    </>
  );
}
