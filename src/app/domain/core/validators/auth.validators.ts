import { NextFunction } from "express";
import * as yup from "yup";
const jwt = require("jsonwebtoken");
const User = require("../../../presentation/rest/model/User.model");

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
        jwt.verify(token, process.env.JWT_SEC, async (err: any, user: any) => {
          if (!user) {
            return res.status(401).json({
              status: 401,
              error: {
                message: "Authentication failed. Please login in afresh.",
              },
            });
          }

          const userProfile = await User.findOne({ _id: user.id });

          req.user = user;
          req.body = {
            user_id: userProfile.id,
            userProfile,
          };

          return next();
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


// Parameters needed for password reset
export const passwordResetValidationSchema = yup.object({
  currentPassword: yup.string().required("Password is required"),

  newPassword: yup.string().required("Password is required"),

  confirmNewPassword: yup
    .string()
    .oneOf([
      yup.ref("newPassword"),
      "Password confirmation should match the password field",
    ])
    .required("Password confirmation is required"),
});

export type PasswordResetInput = yup.InferType<
  typeof passwordResetValidationSchema
> & {
  id: string;
};