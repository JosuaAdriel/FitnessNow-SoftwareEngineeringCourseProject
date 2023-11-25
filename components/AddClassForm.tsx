"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ClassType, classSchema } from "@/validations/classSchema";
import { generateRandomNumber } from "@/lib/utils";
import Env from "@/config/Env";

export default function AddClassForm() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [date, setDate] = React.useState<Date>();
  /* const [time, setTime] = useState("07:00"); */
  const supabase = createClientComponentClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ClassType>({
    resolver: yupResolver(classSchema),
  });

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setValue("image", file);
    }
  };

  const onSubmit = async (payload: ClassType) => {
    console.log("berhasil");
    setLoading(true);
    const uniquePath = Date.now() + "_" + generateRandomNumber();
    const { data: imgData, error: imgErr } = await supabase.storage.from(Env.S3_BUCKET).upload(uniquePath, image!);
    if (imgErr) {
      toast.error(imgErr.message, { theme: "colored" });
      setLoading(false);
      return;
    }

    // * Store class
    const { error: homeErr } = await supabase.from("kelas_latihan").insert({
      className: payload.className,
      quota: payload.quota,
      category: payload.category,
      instructor: payload.instructor,
      date: payload.date,
      /* time: payload.time, */
      duration: payload.duration,
      price: payload.price,
      image: imgData?.path,
    });

    if (homeErr) {
      toast.error(homeErr.message, { theme: "colored" });
      setLoading(false);
      return;
    }

    router.push("/admin");
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <li className="hover:bg-gray-200 rounded-md p-2 cursor-pointer border bg-red-800" onClick={() => setOpen(true)}>
          Add Class
        </li>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle asChild>
            <div className="flex justify-between items-cener">
              <span>Add Class</span>
              <X onClick={() => setOpen(false)} className="cursor-pointer" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <ToastContainer />
              <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                <ToastContainer />
                <div className="grid grid-cols-2 gap-5">
                  <div className="mt-5">
                    <Label htmlFor="classname">Class Name</Label>
                    <Input placeholder="Enter class name here" id="classname" {...register("className")} />
                    <span className="text-red-400">{errors.className?.message}</span>
                  </div>
                  <div className="mt-5">
                    <Label htmlFor="quota">Class Quota</Label>
                    <Input placeholder="Enter class quota here" id="quota" {...register("quota")} />
                    <span className="text-red-400">{errors.quota?.message}</span>
                  </div>
                  <div className="">
                    <Label htmlFor="category">Class Category</Label>
                    <select id="category" className="outline-black h-10 px-3 py-2 rounded-md w-full border" {...register("category")}>
                      <option value=""> -- Select Category -- </option>
                      <option value="yoga"> Yoga </option>
                      <option value="pilates"> Pilates </option>
                      <option value="hiit"> HIIT </option>
                      <option value="cycling"> Cycling </option>
                      <option value="bootcamp"> Bootcamp </option>
                      <option value="zumba"> Zumba </option>
                      <option value="kickboxing"> Kickboxing </option>
                    </select>
                    <span className="text-red-400">{errors.category?.message}</span>
                  </div>
                  <div className="">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input placeholder="Enter class instructor here" id="instructor" {...register("instructor")} />
                    <span className="text-red-400">{errors.instructor?.message}</span>
                  </div>
                  <div className="">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {/* <div className="">
                    <Label htmlFor="time">Time</Label>
                    <Input placeholder="Enter class time here" id="time" {...register("time")} />
                    <span className="text-red-400">{errors.time?.message}</span>
                  </div> */}

                  <div className="">
                    <Label htmlFor="duration">Duration</Label>
                    <Input placeholder="Enter class duration here" id="duration" {...register("duration")} />
                    <span className="text-red-400">{errors.duration?.message}</span>
                  </div>
                  <div className="">
                    <Label htmlFor="price">Price</Label>
                    <Input placeholder="Enter class price here" id="price" {...register("price")} />
                    <span className="text-red-400">{errors.price?.message}</span>
                  </div>
                  <div className="">
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" type="file" onChange={handleImage} placeholder="Enter image" />
                    <span className="text-red-400">{errors.image?.message}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <Button className="bg-brand w-full mt-5" disabled={loading}>
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
