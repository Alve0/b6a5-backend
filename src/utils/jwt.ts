import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payLoad: JwtPayload,
  secret: string,
  { expiresIn }: SignOptions,
) => {
  const token = jwt.sign(payLoad, secret, { expiresIn });
  return token;
};

const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return { seccess: true, message: decoded };
  } catch (err) {
    return {
      seccess: false,
      message: err,
    };
  }
};

const decodeToken = (token: string) => {
  const decoded = jwt.decode(token) as JwtPayload;
  return { seccess: true, message: decoded };
};
export const jwtUtils = {
  createToken,
  verifyToken,
  decodeToken,
};
