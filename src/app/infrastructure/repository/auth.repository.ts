import { ServerResponse } from "../../../../types";
import Logger from "../../application/middleware/loggers/logger";
import { transporter } from "../../application/utils/helpers";
import {
  LoginInput,
  PasswordResetInput,
  RegisterInput,
} from "../../domain/core/validators/auth.validators";
const User = require("./../../presentation/rest/model/User.model");

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

export default class AuthRepository {
  constructor() {}

  //   Route for Register
  async register(input: RegisterInput) {
    try {
      if (input.password !== input.password_confirmation) {
        return {
          status: 400,
          message: "Password do not match",
        };
      }
      const newUser = new User({
        names: input.names,
        email: input.email,
        password: CryptoJS.SHA256(input.password).toString(),
      });
      const savedUser = await newUser.save();

      const info = await transporter.sendMail({
        from: process.env.GMAIL_NAME,
        to: `${newUser.email}`,
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });

      console.log("Message sent: %s", info.messageId);

      return {
        status: 201,
        message:
          "Registration successful. A verification email will be sent to your email",
        data: savedUser,
      };
    } catch (error) {
      Logger.error(error);
      /**
       * Server errors.
       * TODO: These can be checked based on prisma codes for db specific errors
       */
      return {
        status: 500,
        message: "User registration cannot be completed at the moment",
        error: {
          errors: {
            details: error,
          },
        },
      };
    }
  }

  //   Route for logging in
  async login(input: LoginInput) {
    try {
      const user = await User.findOne({ email: input.email });

      // If user does not exist
      if (!user) {
        return {
          status: 400,
          message: "Either password or email is incorrect",
        };
      }

      const hashed = CryptoJS.SHA256(input.password).toString();
      if (!user) {
        return { status: 400, message: "Wrong Credentials!" };
      }
      const ifPasswordMatch = user.password === hashed ? true : false;

      if (!ifPasswordMatch) {
        return {
          status: 400,
          message: "Login failed. Either password or email is incorrect",
        };
      }

      // generating access token
      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SEC,
        { expiresIn: "12h" }
      );

      // generate refresh token
      const refreshToken = jwt.sign(
        user.names,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );

      const { password, ...others } = user.toObject();
      return {
        status: 200,
        message: "Login successful",
        data: {
          user: others,
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      };
    } catch (error) {
      Logger.debug(error);
      return {
        status: 500,
        message: "User Login Failed",
        error: {
          errors: {
            details: error,
          },
        },
      };
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<ServerResponse<void>> {
    return {
      status: 200,
      message: email,
    };
  }

  // Reset Password
  async updatePassword(input: PasswordResetInput) {
    try {
      const hashed = CryptoJS.SHA256(input.newPassword).toString();
      const user = await User.findOne({ id: input.id });
      if (user) {
        user.password = hashed;
        user.save();
        return {
          status: 200,
          message: "Password updated successful",
        };
      }
    } catch (error) {
      Logger.debug(error);
      return {
        status: 500,
        message: "User Login Failed",
        error: {
          errors: {
            details: error,
          },
        },
      };
    }
  }
}
