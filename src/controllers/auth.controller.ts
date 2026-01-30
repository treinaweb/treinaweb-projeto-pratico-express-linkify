import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      const result = await authService.register(email, password, name);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const result = await authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
