import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/base/Navbar";
import { redirect } from "next/navigation";

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  console.log("This is user", data.user);
  console.log(data);
  const { data: sesi, error } = await supabase.auth.getSession();
  {
    sesi?.session?.user == null ? redirect("/about") : <></>;
  }
  return (
    <div className="container min-h-screen">
      <div className="grid grid-cols-2 mt-5 gap-2">
        <p>Name: </p>
        <p>{data.user?.user_metadata.name}</p>
        <p>Email: </p>
        <p>{data.user?.email}</p>
        <p>Age: </p>
        <p>{data.user?.user_metadata.age}</p>
        <p>Medical History: </p>
        <p>{data.user?.user_metadata.medicalHistory}</p>
        <p>Phone Number: </p>
        <p>{data.user?.user_metadata.phoneNumber}</p>
      </div>
    </div>
  );
}
