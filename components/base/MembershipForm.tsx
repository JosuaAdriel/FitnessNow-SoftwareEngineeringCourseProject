"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Env from "@/config/Env";
import { generateRandomNumber } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TransactionType, transactionSchema } from "@/validations/transactionSchema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

export default function MembershipForm() {
  const expiredDate = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
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

    const { error: tranError } = await supabase.from("transaction").insert({
      idPembayar: user.data.user?.id,
      jenisBayar: "Membership",
      nominal: 200000,
    });

    const { error: notifError } = await supabase.from("notification").insert({
      idPenerima: user.data.user?.id,
      title: "Membership Payment Success",
      message: `Your membership is active until ${expiredDate}`,
    });

    const { error: userError } = await supabase
      .from("users")
      .update({
        isActive: true,
        activeUntil: expiredDate,
      })
      .eq("id", user.data.user?.id)
      .select();

    if (tranError) {
      toast.error(tranError.message, { theme: "colored" });
      setLoading(false);
      return;
    }
    router.refresh();
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <div className="w-36 text-md text-center bg-red-600 hover:bg-red-900 font-medium text-white rounded-md p-2 cursor-pointer" onClick={() => setOpen(true)}>
          Join Member
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="flex justify-between items-center">
              <span className="text-xl font-extrabold">Membership Payment</span>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="px-2">
              {/* <ToastContainer /> */}
              <p className="text-lg font-semibold text-black">Membership Registration (30 Days)</p>
              <p className="text-xl font-semibold text-red-500">Rp 200.000</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5">
                  <Label htmlFor="image">Proof of payment (Image)</Label>
                  <Input type="file" placeholder="Enter image" id="image" onChange={handleImage} />
                  <span className="text-red-500 font-bold">{errors?.image?.message}</span>
                </div>{" "}
                <div className="mt-5">
                  <Button className="bg-red-600 hover:bg-red-900 w-full text-md" disabled={loading}>
                    {loading ? "loading" : "Submit"}
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
