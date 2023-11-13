import { NextFunction, Response, Request } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createCookie } from "../utils/create-cookie.js";
import { COOKIE_NAME } from "../constants/common.js";
import UserInterface from "../types/User.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //aqui tenemos todos los usuarios
  try {
    const users = await User.find();

    //response
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, image = null, password }:UserInterface = req.body;
    //verify if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User alredy registered");
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, image, password: hashedPassword });
    await user.save();

    //create cookie
    createCookie(res, user, req);

    //reponse
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email, image: user.image });
  } catch (error) {
    console.log(error);
    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User not found");

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) return res.status(403).send("Incorrect password");

    //create cookie
    createCookie(res, user, req);

    return res
      .status(200)
      .json({ message: "Welcome", name: user.name, email: user.email, image: user.image });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if token is valid
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found or Token malfuntioned");
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission denied");
    }
    return res
      .status(200)
      .json({ message: "Welcome", name: user.name, email: user.email, image: user.image });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if token is valid
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found or Token malfuntioned");
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission denied");
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "Bye 👋" });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};
