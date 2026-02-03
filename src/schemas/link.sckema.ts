import z, { email } from "zod";

export const linkSchema = z.object({
  originalUrl: z.url("URL Inválida"),
});