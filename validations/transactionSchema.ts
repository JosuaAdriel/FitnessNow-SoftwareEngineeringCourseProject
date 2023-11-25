import { time } from "console";
import * as yup from "yup";
import { bytesToMB } from "@/lib/utils";

export const transactionSchema = yup
  .object({
    image: yup
      .mixed()
      .test("image", "Only JPEG and PNG image are allowed", (file: any) => {
        const isValid = file?.type == "image/jpeg" || file?.type == "image/jpg" || file?.type == "image/png";
        return isValid;
      })
      .test("imageSize", "Image must be less than 2 MB", (file: any) => {
        const isValid = bytesToMB(file?.size) <= 2;
        return isValid;
      }),
  })
  .required();

export type TransactionType = yup.InferType<typeof transactionSchema>;
