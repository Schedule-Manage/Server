import { Request, Response, Router } from "express";
import {
  LoginInput,
  RegisterInput,
  authenticateRequest,
} from "../../../domain/core/validators/auth.validators";
import AuthUsecase from "../../../application/usecases/auth.usecases";

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

    // Password reset route
    this.router.post("/forgot/password",authenticateRequest(), this.forgotPassword);
  }

  private async register(req: Request, res: Response) {
    const payload: RegisterInput = req.body;
    const response = await usecase.register(payload);
    return res.json(response);
  }

  private async login(req: Request, res: Response) {
    const payload: LoginInput = req.body;
    const response = await usecase.login(payload);
    return res.json(response);
  }

  /**
   * Forgot Password
   * @param req
   * @param res
   */
  private async forgotPassword(req: Request, res: Response) {
    const {email} = req.body
    const response = await usecase.forgotPassword(email)
    return res.status(response.status).json(response)
  }
}
