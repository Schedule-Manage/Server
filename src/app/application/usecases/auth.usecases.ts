import {
  LoginInput,
  RegisterInput,
} from "../../domain/core/validators/auth.validators";
import AuthRepository from "../../infrastructure/repository/auth.repository";

export default class AuthUsecase {
  repository;
  //   repository: IAuthInterface;
  constructor() {
    this.repository = new AuthRepository();
  }

  async register(input: RegisterInput) {
    return await this.repository.register(input);
  }

  async login(input: LoginInput) {
    return await this.repository.login(input);
  }
}
