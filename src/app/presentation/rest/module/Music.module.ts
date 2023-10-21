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
    this.router.post("/history/playlist/:id", this.historyPlaylist);
    this.router.get("/history/playlist", this.getAllHistoryPlaylist);
    this.router.delete("/history/playlist/:id", this.deleteHistorySong);

    // Route for adding song to playlist
    this.router.post("/add", this.addSongToPlayList);
    this.router.post("/add/:id", this.addSongToSpecificPlayList);
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

  // For adding to a specific playlist
  private async addSongToSpecificPlayList(req: Request, res: Response) {
    const payload = req;
    const response = await usecase.addSongToSpecificPlayList(payload);
    return res.send(response);
  }

  // For history playlist
  private async historyPlaylist(req: Request, res: Response) {
    const payload = req.params.id;
    const response = await usecase.historyPlaylist(payload);
    return res.send(response);
  }
  // get all song in history playlist
  private async getAllHistoryPlaylist(req: any, res: any) {
    const response = await usecase.getAllHistoryPlaylist();
    return res.send(response);
  }

  // Delete a song in history
  private async deleteHistorySong(req: any, res: any) {
    const payload = req.params.id;
    const response = await usecase.deleteHistorySong(payload);
    return res.send(response)
  }
}
