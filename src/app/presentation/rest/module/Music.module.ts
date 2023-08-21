import { Request, Response, Router } from "express";
// import {} from "../../../domain/core/validators/music.validators"
import MusicUsecase from "../../../application/usecases/music.usecases"

const usecase: MusicUsecase = new MusicUsecase();
export default class MusicModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    // Router for Uploading music
    this.router.post("/upload", this.upload)
  }

  private async upload(req: Request, res: Response){
    const payload = req.body
    const response = await usecase.upload(payload)
    return res.json(response)
  }
}
