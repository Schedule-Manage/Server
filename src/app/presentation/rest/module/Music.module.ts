import { Request, Response, Router } from "express";
import {
  TrackInput,
  fileStorageEngine} from "../../../domain/core/validators/music.validators";
import MusicUsecase from "../../../application/usecases/music.usecases";
const multer = require("multer");

const usecase: MusicUsecase = new MusicUsecase();
const fileStorage = fileStorageEngine;
const uploadImg = multer({ storage: fileStorage });

export default class MusicModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    // Router for Uploading music
    this.router.post("/upload", uploadImg.single("image"), this.upload);
  }

  private async upload(req: Request, res: Response) {
    const payload = req.file;
    const response = await usecase.upload(payload);

    return res.json(response);
  }
}
