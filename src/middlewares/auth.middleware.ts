import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return res.status(401).json({ error: "Não Autorizado" });
    }

    (req as any).user = session.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token Inválido"});
  }
}
