import { ServerResponse } from "../../../../types";
import Logger from "../../application/middleware/loggers/logger";

// Importing the Music database
const Track = require("./../../presentation/rest/model/music/Music.model");
const fs = require("fs");
const path = require("path");
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

  async getMusic() {
    try {
      let files = fs.readdirSync("./music", function (err: any, files: any) {
        // Handling error

        if (err) {
          // return;

          console.log("Unable to scan directory: " + err);
        }
        // Listing all files using forEach
        files.forEach(function (file: any) {
          console.log(file);
        });

        // Return a response after reading the directory

        // const response = {
          //   status: 200,
          //   data: files,
        // };
        // return response;
      });
      console.log(files);
      return { data: files, status: 200, message: "Here are the files" };
    } catch (error) {
      // Handle synchronous errors

      const response = {
        status: 500,
        message: "Request cannot be completed at this time",
        error: {
          errors: {
            details: error,
          },
        },
      };

      console.error(response);
    }
  }
}
