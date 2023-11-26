import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getImageUrl } from "@/lib/utils";
import DateFormat from "./DateFormat";

export default function Card({ kelas }: { kelas: any }) {
  const rupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Link href={`/classes/${kelas.id}`} className="rounded-lg shadow-lg pb-4 mx-3 mb-8">
      <Image src={getImageUrl(kelas.image)} alt="fitness-image" width={500} height={500} className="object-cover h-52 rounded-t-lg overflow-hidden"></Image>
      <h3 className="text-xl lg:text-2xl font-bold mt-2 px-2 lg:px-4">{kelas.classname}</h3>
      <p className="text-lg lg:text-xl font-regular px-2 lg:px-4">
        <DateFormat date={kelas.date} />
      </p>
      <p className="text-lg lg:text-xl font-regular px-2 lg:px-4">{`${kelas.duration} minutes`}</p>
      <p className="text-xl lg:text-2xl font-semibold text-red-500 px-2 lg:px-4">{rupiah(kelas.price)}</p>
    </Link>
  );
}
