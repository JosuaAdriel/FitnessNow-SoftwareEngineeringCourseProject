import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import MembershipForm from "./MembershipForm";

export default async function AccStatus() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const { data: dataUser } = await supabase.from("users").select("*").eq("id", data.user?.id);
  const user: any | null = dataUser?.[0];
  const currentDate = new Date().getTime;

  return (
    <div>
      <div>
        {user.isActive ? (
          <div className="text-white p-24 text-3xl font-bold w-full text-center gap-y-12">
            <div>Your membership is active</div>
            <div>{`Until ${user.activeUntil}`}</div>
          </div>
        ) : (
          <div className="p-24 text-center space-y-12">
            <div className="text-white text-3xl font-bold w-full ">You are currently not a member</div>
            <div className="justify-center flex pb-5">
              <MembershipForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
