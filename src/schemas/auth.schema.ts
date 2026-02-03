import z, { email } from "zod";

export const registerSchema = z.object({
  email: z.email("Email inválido"),
  password: z
    .string("Password deve ser uma string")
    .min(6, "Senha deve ter no mínimo 6 caracteres"),
  name: z
    .string("Nome deve ser uma string")
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
});

export const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z
    .string("Password deve ser uma string")
    .min(6, "Senha deve ter no mínimo 6 caracteres")
});