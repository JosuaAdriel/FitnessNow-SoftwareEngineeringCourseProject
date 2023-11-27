import * as yup from "yup";
import { bytesToMB } from "@/lib/utils";

export const classSchema = yup
  .object({
    className: yup.string().required().max(30),
    quota: yup.number().required().max(100).typeError("Quota must be number."),
    category: yup.string().required().max(20),
    instructor: yup.string().required().max(30),
    date: yup.date().required(),
    time: yup.date().transform((originalValue, originalObject) => {
      return originalValue;
    }),
    duration: yup.number().required(),
    price: yup.number().required().typeError("Price must be number."),
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

export type ClassType = yup.InferType<typeof classSchema>;
