import React from "react";

export default function NotifContainer({ notifikasi }: { notifikasi: any }) {
  return (
    <div className="w-full py-2 bg-white hover:bg-gray-200 rounded-md">
      <h1 className="font-semibold text-lg">{notifikasi.title}</h1>
      <p className="mt-1 text-md">{notifikasi.message}</p>
      <p className="text-md">{notifikasi.created_at}</p>
    </div>
  );
}
