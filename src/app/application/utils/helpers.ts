import cors from "cors";
import bcrypt from "bcrypt";
import { PasswordCompareInput } from "../../../../types";
// import jwt from "jsonwebtoken";

/**
 * Used to hash passwords
 * @param password
 * @returns string
 */

const generateSecurePasswords = async (password: string) => {
  const salt = await bcrypt.genSalt(15);
  return bcrypt.hashSync(password, salt);
};

/**
 * Compares the pasword
 * @param PasswordCompareInput
 * @returns boolean
 */
const comparePasswords = async (input: PasswordCompareInput) => {
  const result = await bcrypt.compare(input.password, input.encrypted);

  return result;
};
