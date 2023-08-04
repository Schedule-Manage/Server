import { Request, Response, Router } from "express";
const User = require("./../model/User.model");

export default class AuthModule {
  public router: Router;

  constructor() {
    this.router = Router();
    this.config();
  }

  private config() {
    this.router.post("/register", this.register);
  }

  private async register(req: Request, res: Response) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      // password: CryptoJS.AES.encrypt(
      //   req.body.password,
      //   process.env.PASS_SEC
      // ).toString(),
      zipcode: req.body.zipcode,
    });

    try {
      const savedUser = await newUser.save();
      const { password, ...others } = savedUser.toObject();
      res.status(201).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
