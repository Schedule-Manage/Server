import { Router } from "express";
import AuthModule from "./module/auth.module";

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.use("/auth", new AuthModule().router )
  }
}
