import { ServerResponse } from "../../../../types";
import Logger from "../../application/middleware/loggers/logger";

// Importing the Music database
const Track = require("./../../presentation/rest/model/music/Music.model");
export default class MusicRepository {
  constructor() {}

  async upload(input: any) {
    try {
      const newTrack = new Track({
        title: input.originalname,
        audio_url: input.path,
        mimetype: input.mimetype,
        size: input.size,
      });
      const savedTrack = await newTrack.save();

      return {
        status: 200,
        data: savedTrack,
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
