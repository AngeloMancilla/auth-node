import jwt, { SignOptions } from "jsonwebtoken";
import { TokenService } from "../../application/ports/TokenService";

export class JwtService implements TokenService {
  private readonly secret: string;

  constructor(secret?: string) {
    this.secret = secret || process.env.JWT_SECRET || "default";
  }

  getExpiresIn(token: string): number {
    const decoded = this.decode(token);
    if (!decoded || !decoded.exp) {
      throw new Error("Invalid token or missing expiration");
    }
    return decoded.exp;
  }

  sign(payload: object, expiresIn: string | number = "1h"): string {
    return jwt.sign(payload, this.secret, { expiresIn } as SignOptions);
  }

  verify(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  decode(token: string): any {
    return jwt.decode(token);
  }
}
