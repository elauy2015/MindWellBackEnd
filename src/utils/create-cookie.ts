import { COOKIE_NAME } from "../constants/common.js";
import { createToken } from "./token-manager.js";
import { Response } from "express";

export const createCookie = (res: Response, user) => {
  res.clearCookie(COOKIE_NAME, {
    path: "/",
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "none",
  });

  const token = createToken(user._id.toString(), user.email, "7d");
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  res.cookie(COOKIE_NAME, token, {
    path: "/",
    expires,
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "none",
  });
};

