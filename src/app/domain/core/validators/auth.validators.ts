import * as yup from "yup";

// Validation when registering
export const registerValidationSchema = yup.object({
  names: yup.string().required("Names are required"),
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Password confirmation should match the password field"
    )
    .required("Password confirmation is required"),
});

export type RegisterInput = yup.InferType<typeof registerValidationSchema>;

// Validation when logging
export const loginValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required("Password is required"),
});

export type LoginInput = yup.InferType<typeof loginValidationSchema>;
