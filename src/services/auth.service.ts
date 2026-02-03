import { auth } from "../lib/auth";

export class AuthService {
  async register(email: string, password: string, name: string) {
    const result = await auth.api.signUpEmail({
      body: { email, password, name }
    });

    return result;
  }

  async login(email: string, password: string) {
    const result = await auth.api.signInEmail({
      body: { email, password }
    });

    return result;
  }

  async logout(headers: any) {
    const result = await auth.api.signOut({
      headers
    });

    return result;
  }
}
