import { Request, Response, Router } from "express";
import { RegisterInput } from "../../../domain/core/validators/auth.validators";
import AuthUsecase from "../../../application/usecases/auth.usecases";
const User = require("./../model/User.model");

const usecase: AuthUsecase = new AuthUsecase();
export default class AuthModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    // Register route
    this.router.post("/register", this.register);

    // Login route
    this.router.post("/login", this.login);
  }

  private async register(req: Request, res: Response) {
    const payload: RegisterInput = req.body;
    const response = await usecase.register(payload);
    return res.json(response);
  }

  private async login(req: Request, res: Response) {}
}
