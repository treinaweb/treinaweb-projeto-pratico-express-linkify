import { prisma } from "../lib/prisma";
import { generateShortCode } from "../lib/shortcode";

export class LinkService {
  async createLink(userId: string, originalUrl: string) {
    let shortCode = generateShortCode();
    let exists = await prisma.link.findUnique({ where: { shortCode } });

    while (exists) {
      shortCode = generateShortCode();
      exists = await prisma.link.findUnique({ where: { shortCode } });
    }

    const link = await prisma.link.create({
      data: {
        originalUrl,
        shortCode,
        userId,
      },
    });

    return link;
  }

  async getUserLinks(userId: string) {
    return await prisma.link.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async deleteLink(linkId: string, userId: string) {
    const link = await prisma.link.findFirst({
      where: { id: linkId, userId },
    });

    if (!link) {
      throw new Error("Link não encontrado");
    }

    await prisma.link.delete({ where: { id: linkId } });
  }

  async redirectLink(shortCode: string) {
    const link = await prisma.link.findUnique({ where: { shortCode } });

    if (!link) {
      throw new Error("Link não encontrado");
    }

    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });

    return link.originalUrl;
  }
}
