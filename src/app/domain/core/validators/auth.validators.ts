import { NextFunction } from "express";
import * as yup from "yup";
const jwt = require("jsonwebtoken");

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

// Validating jwt bearer token
export const authenticateRequest = () => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      if (req.headers.authorization != null) {
        const bearer: string = req.headers.authorization;
        const token = bearer.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err: any, user: any) => {
          if (err) {
            return res.status(500);
          }

          return res.status(200).json({
            status: 200,
            message: "Verified",
            user: user.id,
          });
        });
      }
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: {
          message: "Authentication failed. Login in again to proceed",
        },
      });
    }
  };
};

export type LoginInput = yup.InferType<typeof loginValidationSchema>;
