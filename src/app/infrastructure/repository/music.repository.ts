import { ServerResponse } from "../../../../types";
import Logger from "../../application/middleware/loggers/logger";
import {
  generateRandomString,
  transporter,
} from "../../application/utils/helpers";
import {
  TrackInput,
  //   PasswordResetInput,
  //   RegisterInput,
} from "../../domain/core/validators/music.validators";

// Importing the Music database
const Track = require("./../../presentation/rest/model/music/Music.model");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
export default class MusicRepository {
  constructor() {}

  async upload(input: any) {
    try {
      //   const newTrack = new Track({
      //     title: input.title,
      //     duration: input.duration,
      //     audio_url:  input.audio_url
      //   });
      //   const savedTrack = await newTrack.save();
      // console.log(input);
      return {
        status: 200,
        data: "input",
      };
    } catch (error) {
      Logger.error(error);
      /**
       * Server errors.
       * TODO: These can be checked based on prisma codes for db specific errors
       */
      return {
        status: 500,
        message: "Music upload cannot be completed at the moment",
        error: {
          errors: {
            details: error,
          },
        },
      };
    }
  }
}
