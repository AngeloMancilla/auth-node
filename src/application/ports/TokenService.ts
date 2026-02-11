export interface JwtPayload {
  email: string;
  name: string;
  userId: string;
  iat?: number;
  exp?: number;
}

export interface TokenService {
  sign(payload: JwtPayload, expiresIn?: string): string;
  verify(token: string): JwtPayload;
  decode(token: string): JwtPayload | null;
  getExpiresIn(token: string): number;
}
