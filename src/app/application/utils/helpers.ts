import cors from "cors";
import bcrypt from "bcrypt";
const nodemailer = require("nodemailer");
require("dotenv").config();
import { PasswordCompareInput } from "../../../../types";
// import jwt from "jsonwebtoken";

/**
 * Helps to configure cors options based on the allowed domains
 * that are passed on through the environment variables
 * @returns
 */
const createCorsOptions = (): cors.CorsOptions => {
  const allowedDomains = process.env.ALLOWED_DOMAINS ?? "*";
  const domains = allowedDomains.split(";").join(",");

  const corsOptions: cors.CorsOptions = {
    origin: domains,
  };
  return corsOptions;
};

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

// For sending email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_NAME,
    pass: process.env.GMAIL_PASS,
  },
});

// Function for generating random 8 characters
function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

const formatAudioName = (name: string) => {
  return name.trim().split(" ").join("_");
};

export {
  comparePasswords,
  generateSecurePasswords,
  createCorsOptions,
  transporter,
  generateRandomString,
  formatAudioName,
};
