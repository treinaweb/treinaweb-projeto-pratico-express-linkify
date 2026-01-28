import { auth } from "../lib/auth";

export class AuthService {
  async register(email: string, password: string, name: string) {
    const result = await auth.api.signUpEmail({
      body: { email, password, name }
    });

    return result;
  }
}
