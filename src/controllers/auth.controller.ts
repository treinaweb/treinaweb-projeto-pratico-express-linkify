import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import z, { ZodError } from "zod";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = registerSchema.parse(req.body);

      const result = await authService.register(email, password, name);
      return res.status(201).json(result);
    } catch (error) {
      if( error instanceof ZodError) {
        const zodError = z.treeifyError(error);
        return res.status(400).json({ error: zodError})
      }
      return res.status(500).json({ error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginSchema.parse(req.body);
      console.log(email, password);
      const result = await authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      if( error instanceof ZodError) {
        const zodError = z.treeifyError(error);
        return res.status(400).json({ error: zodError})
      }
      return res.status(500).json({ error });
    }
  }
}
