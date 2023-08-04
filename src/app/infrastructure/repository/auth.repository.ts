import Logger from "../../application/middleware/loggers/logger";
import { generateSecurePasswords } from "../../application/utils/helpers";
import { RegisterInput } from "../../domain/core/validators/auth.validators";
const User = require("./../../presentation/rest/model/User.model");
export default class AuthRepository {
  constructor() {}

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
}
