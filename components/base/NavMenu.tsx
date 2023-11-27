import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MenuIcon } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import SignOutBtn from "../auth/SignOutBtn";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function NavMenu({ session }: { session: Object | undefined }) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <MenuIcon color="white" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="mr-6">
        <div>
          {session != null ? (
            <>
              <Link href="/" className="md:hidden w-full flex hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                Home
              </Link>
              <Link href="/classes" className="md:hidden w-full flex hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                Classes
              </Link>
              <Link href={`/profile/${data.user?.id}`} className="w-full flex hover:bg-gray-200 rounded-md p-2 cursor-pointer">
                My Profile
              </Link>
              <SignOutBtn />
            </>
          ) : (
            <>
              <LoginModal />
              <SignupModal />
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
