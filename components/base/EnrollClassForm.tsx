"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Env from "@/config/Env";
import { generateRandomNumber } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransactionType, transactionSchema } from "@/validations/transactionSchema";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export default function EnrollClassForm({ classs }: { classs: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const supabase = createClientComponentClient({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TransactionType>({
    resolver: yupResolver(transactionSchema),
  });
  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setValue("image", file);
    }
  };

  const rupiah = (number: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const onSubmit = async (payload: TransactionType) => {
    setLoading(true);
    const user = await supabase.auth.getUser();
    const uniquePath = Date.now() + "_" + generateRandomNumber();
    const { data: imgData, error: imgErr } = await supabase.storage.from(Env.S3_BUCKET).upload(uniquePath, image!);
    if (imgErr) {
      toast.error(imgErr.message, { theme: "colored" });
      setLoading(false);
      return;
    }
    const { error: enrollError } = await supabase.from("anggota_ikut_kelas").insert({
      user_id: user.data.user?.id,
      image: imgData?.path,
      class_id: classs.id,
    });

    const { error: tranError } = await supabase.from("transaction").insert({
      idPembayar: user.data.user?.id,
      jenisBayar: "Class",
      nominal: classs.price,
    });

    const { error: notifError } = await supabase.from("notification").insert({
      id_penerima: user.data.user?.id,
      title: "Class Enroll Success",
      message: `Your are enrolled in class ${classs.class_name}`,
    });

    if (enrollError) {
      toast.error(enrollError.message, { theme: "colored" });
      setLoading(false);
      return;
    }
    router.push("/classes/registered-class");
    router.refresh();
    setOpen(false);
    toast.success("Class Enroll Success", { theme: "colored" });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <li className="text-md text-center bg-red-600 hover:bg-red-900 font-medium text-white rounded-md p-2 cursor-pointer" onClick={() => setOpen(true)}>
          Enroll
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="flex justify-between items-center">
              <span className="text-xl font-extrabold">Class Enroll Payment</span>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="items-left">
              {/* <ToastContainer /> */}
              <div className="w-full flex justify-start text-lg font-semibold text-black">{classs.class_name}</div>
              <div className="w-full flex justify-start text-xl font-semibold text-red-500">{rupiah(classs.price)}</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5">
                  <Label htmlFor="image">
                    <div className="w-full flex justify-start">Proof of payment (Max 2MB)</div>
                  </Label>
                  <Input type="file" placeholder="Enter image" id="image" onChange={handleImage} />
                  <span className="text-red-500 font-bold">{errors?.image?.message}</span>
                </div>{" "}
                <div className="mt-5">
                  <Button className="bg-red-600 hover:bg-red-900 w-full text-md" disabled={loading}>
                    {loading ? "loading" : "continue"}
                  </Button>
                </div>
              </form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
