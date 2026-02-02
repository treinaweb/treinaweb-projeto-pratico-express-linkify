import { Request, Response } from "express";
import { LinkService } from "../services/link.service";

const linkService = new LinkService();

export class LinkController {
  async create(req: Request, res: Response) {
    try {
      const { originalUrl } = req.body;
      const userId = (req as any).user.id;

      const link = await linkService.createLink(userId, originalUrl);

      return res.status(201).json({
        id: link.id,
        originalUrl: link.originalUrl,
        shortCode: link.shortCode,
        shortUrl: `${process.env.URL}/${link.shortCode}`,
        clicks: link.clicks,
        createdAt: link.createdAt,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getLinks(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;

      const links = await linkService.getUserLinks(userId);

      return res.status(201).json(
        links.map((link) => ({
          id: link.id,
          originalUrl: link.originalUrl,
          shortCode: link.shortCode,
          shortUrl: `${process.env.URL}/${link.shortCode}`,
          clicks: link.clicks,
          createdAt: link.createdAt,
        })),
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;

      await linkService.deleteLink(id as string, userId);

      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async redirect(req: Request, res: Response) {
     try {
      const { shortCode } = req.params;
      const originalUrl = await linkService.redirectLink(shortCode as string);

      return res.redirect(originalUrl)
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
