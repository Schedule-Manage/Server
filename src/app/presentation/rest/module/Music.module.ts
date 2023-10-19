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

    // Route for playlist history
    this.router.post("/playlist/:id", this.historyPlaylist);

    // Route for adding song to playlist
    this.router.post("/add", this.addSongToPlayList);
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

  // Adding song to playlist
  private async addSongToPlayList(req: Request, res: Response) {
    const payload: any = req.body;
    const response = await usecase.addSongToPlayList(payload);
    return res.send(response);
  }

  // For history playlist
  private async historyPlaylist(req: Request, res: Response) {
    const payload = req.params.id;
    const response = await usecase.historyPlaylist(payload);
    return res.send(response);
  }
}
