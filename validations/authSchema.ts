import * as yup from "yup";

export const registerSchema = yup
  .object({
    name: yup.string().required().min(3).max(50),
    phoneNumber: yup.string().required().min(10).max(13),
    medicalHistory: yup.string().max(50),
    age: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
    isActive: yup.bool(),
    confirmation_password: yup
      .string()
      .oneOf([yup.ref("password")], "confirm password not matched")
      .required(),
  })
  .required();

export type RegisterType = yup.InferType<typeof registerSchema>;

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(30).required(),
  })
  .required();

export type LoginType = yup.InferType<typeof loginSchema>;
