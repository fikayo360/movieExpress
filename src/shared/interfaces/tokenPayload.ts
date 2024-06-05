export interface TokenPayload {
  sub: string,
  email: string,
  role: string
}

export type Tokens = {
  access_token: string,
  refresh_token: string,
}

export type jwtPayload = {
  sub: string,
  email: string,
  role: string
}
