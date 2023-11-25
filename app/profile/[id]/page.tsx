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
    <div className="min-h-screen">
      <div className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/3">
          <img alt="Welcome" src="/images/boxing.jpg" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-2/3 lg:px-20 p-3 lg:py-24">
          <div className="mx-auto max-w-lg text-center p-10">
            <h1 className="text-2xl font-bold sm:text-3xl">Member Profile</h1>
          </div>
          <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Email</dt>
                <dd className="text-gray-700 sm:col-span-2">{data.user?.email}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{data.user?.user_metadata.name}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Age</dt>
                <dd className="text-gray-700 sm:col-span-2">{data.user?.user_metadata.age}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Contact Number</dt>
                <dd className="text-gray-700 sm:col-span-2">{data.user?.user_metadata.phoneNumber}</dd>
              </div>

              <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Medical History</dt>
                <dd className="text-gray-700 sm:col-span-2">{data.user?.user_metadata.medicalHistory}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
