import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import config from "../config";
import { cookieUtils } from "./cookie";
import { Response } from "express";
import ms, { StringValue } from "ms";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  } as SignOptions);
  console.log(accessToken);
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  } as SignOptions);
  console.log(refreshToken);
  return refreshToken;
};

const setAccessTokenCookie = (res: Response, token: string) => {
  const maxAge = ms((config.jwt.accessExpiresIn as unknown) as StringValue);
  cookieUtils.setCookie(res, "accesstoken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: Number(maxAge),
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  const maxAge = ms((config.jwt.refreshExpiresIn as unknown) as StringValue);
  cookieUtils.setCookie(res, "refreshtoken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: Number(maxAge),
  });
};

const setBetterAuthSessionTokenCookie = (res: Response, token: string) => {
  const maxAge = ms((config.jwt.accessExpiresIn as unknown) as StringValue);
  cookieUtils.setCookie(res, "better-auth.session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: Number(maxAge),
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setBetterAuthSessionTokenCookie,
};
