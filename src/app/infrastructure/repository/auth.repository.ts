import Logger from "../../application/middleware/loggers/logger";
import {
  comparePasswords,
  generateSecurePasswords,
} from "../../application/utils/helpers";
import {
  LoginInput,
  RegisterInput,
} from "../../domain/core/validators/auth.validators";
const User = require("./../../presentation/rest/model/User.model");

const jwt = require("jsonwebtoken");
export default class AuthRepository {
  constructor() {}

  //   Route for Register
  async register(input: RegisterInput) {
    try {
      const hashed = await generateSecurePasswords(input.password);
      const newUser = new User({
        names: input.names,
        email: input.email,
        password: hashed,
      });
      const savedUser = await newUser.save();
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

      if (!user) {
        return { status: 400, message: "Wrong Credentials!" };
      }

      const ifPasswordMatch = await comparePasswords({
        password: input.password,
        encrypted: user.encrypted,
      });

      if (!ifPasswordMatch) {
        return {
          status: 400,
          message: "Login failed. Either password or email is incorrect",
        };
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SEC,
        { expiresIn: "1d" }
      );

      const { password, ...others } = user.toObject();
      return {
        status: 200,
        message: "Login successful",
        data: {
          user: others,
          access_token: accessToken,
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
}
