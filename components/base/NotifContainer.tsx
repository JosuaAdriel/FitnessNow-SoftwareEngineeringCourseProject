import React from "react";

export default function NotifContainer({ notifikasi }: { notifikasi: any }) {
  let inputDate = new Date(notifikasi.created_at);
  const notifDate = inputDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full p-2 bg-white hover:bg-gray-200 rounded-md">
      <h1 className="font-semibold text-lg">{notifikasi.title}</h1>
      <p className="mt-1 text-md">{notifikasi.message}</p>
      <p className="text-md flex text-gray-500 justify-end">{notifDate}</p>
    </div>
  );
}
