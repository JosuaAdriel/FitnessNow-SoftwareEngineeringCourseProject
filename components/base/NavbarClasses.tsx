import React from "react";
import BrandLogo from "./BrandLogo";
import NavMenu from "./NavMenu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import NotificationPopup from "./NotificationPopup";

export default async function NavbarClasses() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();
  return (
    <div className="w-full flex bg-black items-center justify-between py-2">
      <div>
        <Link href="/">
          <BrandLogo />
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        {data?.session?.user != null ? (
          <div className="flex space-x-2">
            <div className="w-full hidden md:block md:w-auto">
              <div className="flex items-center space-x-2 p-2">
                <Link href="/" className="hidden hover:underline focus:font-semibold md:block text-md pl-2 text-white">
                  Home
                </Link>
                <span>|</span>
                <Link href="/classes" className="hidden hover:underline font-bold md:block text-md pl-2 text-white">
                  Classes
                </Link>
                <span>|</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationPopup />
            </div>
          </div>
        ) : (
          <></>
        )}
        <NavMenu session={data?.session?.user} />
      </div>
    </div>
  );
}
