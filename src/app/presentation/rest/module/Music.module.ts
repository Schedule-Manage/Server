import { Request, Response, Router } from "express";
import {
  TrackInput,
  fileStorageEngine,
} from "../../../domain/core/validators/music.validators";
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
    this.router.post("/upload", uploadImg.single("music"), this.upload);

    // Getting all music
    this.router.get("/", this.getMusic);
  }

  private async upload(req: Request, res: Response) {
    const payload = req.file;
    const response = await usecase.upload(payload);

    return res.json(response);
  }

  private async getMusic(req: Request, res: Response) {
    const response = await usecase.getMusic();
    return res.send(response);
  }
}
