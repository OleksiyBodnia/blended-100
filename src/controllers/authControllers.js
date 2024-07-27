import { UserCollection } from "../db/models/user.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { SessionCollection } from "../db/models/session.js";
import randomBytes from "randombytes";
import { now } from "mongoose";
import { date } from "joi";

export const registerUser = async (req, res, next) => {
  try {
    const user = await UserCollection.findOne({ email: req.body.email });
    if (user) {
      throw createHttpError(409, "Email in use");
    }

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    // const createUser = UserCollection.create(req.body);
    const createdUser = await UserCollection.create({
      ...req.body,
      password: encryptedPassword,
    });

    res.status(201).json({
      status: 201,
      message: "User created!",
      data: {
        _id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserCollection.findOne({ email });

    if (!user) {
      throw createHttpError(400, "Email or password is wrong");
    }

    const isPasswordCompared = await bcrypt.compare(password, user.password);

    if (!isPasswordCompared) {
      throw createHttpError(400, "Email or password is wrong");
    }

    await SessionCollection.deleteOne({ userId: user._id });

    const session = await SessionCollection.create({
      userId: user._id,
      accessToken: randomBytes(32).toString("base64"),
      refreshToken: randomBytes(32).toString("base64"),
      accessTokenValidUntil: new Date(Date.now() + 1 * 60 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json({
      status: 200,
      message: "Successfully login",
      data: {
        refreshToken: session.refreshToken,
        accessToken: session.accessToken,
        user: {
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// console.log(randomBytes(32).toString('base64'));

export const sendEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserCollection.findOne({ email });
    if (!user) {
      throw createHttpError(404, "Not found email");
    }
  } catch (error) {}
};
