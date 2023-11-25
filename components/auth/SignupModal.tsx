"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { RegisterType, registerSchema } from "@/validations/authSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignupModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (payload: RegisterType) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          name: payload.name,
          phoneNumber: payload.phoneNumber,
          medicalHistory: payload.medicalHistory,
          age: payload.age,
        },
      },
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
          Signup
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="flex justify-between items-cener">
              <span>Sign up</span>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <ToastContainer />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer />
                <div className="mt-5">
                  <Label htmlFor="name">Name</Label>
                  <Input placeholder="Enter your name" id="name" {...register("name")} />
                  <span className="text-red-400">{errors.name?.message}</span>
                </div>
                <div className="mt-5">
                  <Label htmlFor="email">Email</Label>
                  <Input placeholder="Enter your email" id="email" {...register("email")} />
                  <span className="text-red-400">{errors.email?.message}</span>
                </div>
                <div className="mt-5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input placeholder="Enter your phone number" id="phoneNumber" {...register("phoneNumber")} />
                  <span className="text-red-400">{errors.phoneNumber?.message}</span>
                </div>
                <div className="mt-5">
                  <Label htmlFor="phone">Age</Label>
                  <Input placeholder="Enter your age" id="age" {...register("age")} />
                  <span className="text-red-400">{errors.age?.message}</span>
                </div>
                <div className="mt-5">
                  <Label htmlFor="phone">Medical History</Label>
                  <Input placeholder="Enter your medical history (optional)" id="medicalHistory" {...register("medicalHistory")} />
                  <span className="text-red-400">{errors.medicalHistory?.message}</span>
                </div>
                <div className="mt-5">
                  <Label htmlFor="password">Password</Label>
                  <Input placeholder="Enter your password" id="password" type="password" {...register("password")} />
                  <span className="text-red-400">{errors.password?.message}</span>
                </div>
                <div className="mt-5">
                  <Label htmlFor="cpassword">Confirm Password</Label>
                  <Input placeholder="Confirm your password" id="cpassword" type="password" {...register("confirmation_password")} />
                  <span className="text-red-400">{errors.confirmation_password?.message}</span>
                </div>
                <div className="mt-5">
                  <Button className="bg-brand w-full" disabled={loading}>
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
