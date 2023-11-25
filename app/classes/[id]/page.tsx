import Navbar from "@/components/base/Navbar";
import React from "react";
import { redirect } from "next/navigation";

import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import EnrollClassForm from "@/components/base/EnrollClassForm";
import { ArrowLeft } from "lucide-react";
import DateFormat from "@/components/base/DateFormat";

export default async function Class({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: User } = await supabase.auth.getUser();
  const { data: isReg } = await supabase.from("anggota_ikut_kelas").select("*").eq("classId", params?.id).eq("userId", User.user?.id);
  const isRegistered: any | null = isReg?.[0];
  console.log("This is isRegistered", isRegistered);
  const { data: kls } = await supabase.from("kelas_latihan").select("*").eq("id", params?.id);
  const { data: dataUser } = await supabase.from("users").select("isActive").eq("id", User.user?.id);
  const kelas: any | null = kls?.[0];
  const curUser: any | null = dataUser?.[0];

  const rupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const { data: sesi, error } = await supabase.auth.getSession();
  {
    sesi?.session?.user == null ? redirect("/about") : <></>;
  }
  return (
    <div className="container min-h-screen">
      <div className="mt-8">
        <Link href="/classes" className="font-bold text-2xl flex items-center gap-2">
          <ArrowLeft />
          <>Back</>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
        <Image src={getImageUrl(kelas.image)} width={768} height={768} alt="/images/github.png" className="w-full"></Image>
        <div className="detail md:ml-4 justify-center md:max-w-[50%]">
          <h1 className="font-bold text-2xl">{kelas.className}</h1>
          <div className="grid grid-cols-2">
            <p className="text-md mt-5">Category</p>
            <p className="text-md mt-5">{`: ${kelas.category}`}</p>
            <p className="text-md mt-5">Quota</p>
            <p className="text-md mt-5">{`: ${kelas.quota}`}</p>
            <p className="text-md mt-5">Instructor</p>
            <p className="text-md mt-5">{`: ${kelas.instructor}`}</p>
            <p className="text-md mt-5">Date</p>
            <p className="text-md mt-5 flex">
              <span>{`: `}</span>
              <span className="opacity-0">{`: `}</span>
              <DateFormat date={kelas.date} />
            </p>
            <p className="text-md mt-5">Duration</p>
            <p className="text-md mt-5">{`: ${kelas.duration}`}</p>
            <p className="font-bold text-red-700 text-2xl my-3">{rupiah(kelas.price)}</p>
          </div>
          {isRegistered == null && curUser?.isActive && <EnrollClassForm classs={kelas} />}
          {isRegistered != null && <p className="text-md text-center bg-gray-300 font-medium text-white rounded-md p-2">Enrolled</p>}
          {!curUser?.isActive && isRegistered == null && <p className="text-md text-center bg-gray-300 font-medium text-white rounded-md p-2">Active Member Only</p>}
        </div>
      </div>
    </div>
  );
}
