import { ServerResponse } from "../../../../types";
import Logger from "../../application/middleware/loggers/logger";

// Importing the Music database
const Track = require("./../../presentation/rest/model/music/Music.model");
const fs = require("fs")
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

  async getMusic(){
    try {

      const files = fs.readdir("./music", function (err: any, files: any) {
        //handling error
        if (err) {
          return console.log("Unable to scan directory: " + err);
        }
        //listing all files using forEach
        files.forEach(function (file: any) {
          return file
        });
        return {
          status: 200,
          message: files,
        };
      });
      
    } catch (error) {
      return {
        status: 500,
        message: "Request cannot be completed at this time",
        error: {
          errors: {
            details: error,
          },
        },
      };
    }
  }
}
