import { Router } from "express";
import AuthModule from "./module/auth.module";
import MusicModule from "./module/Music.module";

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    // For routing
    this.router.use("/auth", new AuthModule().router ),

    // For uploading music files
    this.router.use("/music", new MusicModule().router)
  }
}
