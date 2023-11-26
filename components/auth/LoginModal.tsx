"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { LoginType, loginSchema } from "@/validations/authSchema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";

export default function LoginModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (payload: LoginType) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message, { theme: "colored" });
    } else if (data.user) {
      await supabase.auth.signInWithPassword({ email: payload.email, password: payload.password });
      setOpen(false);
      router.refresh();
      toast.success("Logged in successfully", { theme: "colored" });
    }
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer" onClick={() => setOpen(true)}>
          Login
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="flex justify-between items-cener">
              <span>Login</span>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <ToastContainer />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5">
                  <Label htmlFor="email">Email</Label>
                  <Input placeholder="Enter your email" id="email" type="email" {...register("email")} />
                  <span className="text-red-400">{errors.email?.message}</span>
                </div>
                <div className="mt-5">
                  <Label htmlFor="password">Password</Label>
                  <Input placeholder="Enter your password" id="password" type="password" {...register("password")} />
                  <span className="text-red-400">{errors.password?.message}</span>
                </div>
                <div className="mt-5">
                  <Button className="bg-red-600 hover:bg-red-900 w-full" disabled={loading}>
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
