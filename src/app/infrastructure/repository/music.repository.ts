import { ServerResponse } from "../../../../types";
import Logger from "../../application/middleware/loggers/logger";
import {
  generateRandomString,
  transporter,
} from "../../application/utils/helpers";
// import {
//   LoginInput,
//   PasswordResetInput,
//   RegisterInput,
// } from "../../domain/core/validators/auth.validators";

// Importing the Music database
const Track = require("./../../presentation/rest/model/music/Music.model")

export default class MusicRepository {
  constructor() {}

  async upload(input: any) {
    return "Music input";
  }
}