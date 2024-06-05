import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const isTokenValid = (token: string) => jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;

module.exports = isTokenValid