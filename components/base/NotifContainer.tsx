import React from "react";

export default function NotifContainer({ notifikasi }: { notifikasi: any }) {
  let inputDate = new Date(notifikasi.created_at);
  const notifDate = inputDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const notifTime = inputDate.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="w-full p-2 bg-white hover:bg-gray-200 rounded-md">
      <h1 className="font-semibold text-lg">{notifikasi.title}</h1>
      <p className="mt-1 text-md">{notifikasi.message}</p>
      <p className="text-md flex text-gray-500 justify-end">{`${notifDate}, ${notifTime}`}</p>
    </div>
  );
}
