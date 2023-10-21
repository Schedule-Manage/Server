import { NextFunction } from "express";
const multer = require("multer");
import fs from "fs";
import path from "path";
import * as yup from "yup";
import { formatAudioName } from "../../../application/utils/helpers";

export const TrackValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  duration: yup.number().required(),
  audio_url: yup.object().shape({
    file: yup.mixed(),
    // .test('is-mp3', 'Invalid file format, expected .mp3', (value) => {
    //   return value && value[0].type === 'audio/mpeg';
    // })
    id3Tags: yup.object().shape({
      title: yup.string().required("Title is required"),
      artist: yup.string().required("Artist is required"),
      // Add more required tags as needed
    }),
  }),
});

export type TrackInput = yup.InferType<typeof TrackValidationSchema>;

export const fileStorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const dir = "./music";
    fs.mkdirSync(dir, {
      recursive: true,
    });

    cb(null, dir);
  },

  filename: (req: any, file: any, cb: any) => {
    return cb(null, formatAudioName(file.originalname));
  },
});
