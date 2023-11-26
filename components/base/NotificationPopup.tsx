import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";
import React from "react";
import NotifContainer from "./NotifContainer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function NotificationPopup() {
  const supabase = createServerComponentClient({ cookies });
  const query = supabase.from("notification").select("*").order("created_at", { ascending: false });
  const { data: Notifikasi } = await query;
  const { data: User } = await supabase.auth.getUser();

  return (
    <Popover>
      <PopoverTrigger>
        <div>
          <Image src="/images/bell.png" alt="Bell" width={20} height={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="py-3 w-80 sm:w-96">
        <p className="text-xl font-bold">Notification</p>
        <div className="overflow-y-scroll max-h-96 my-2">
          {Notifikasi?.length == 0 ? <div>Tidak Ada Data</div> : <></>}
          {Notifikasi && Notifikasi?.length > 0 && (
            <div className="border-x-0">{Notifikasi?.map((item, index) => (item.isExclusive == false || item.id_penerima == User.user?.id ? <NotifContainer notifikasi={item} key={index} /> : <></>))}</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
