import { PrismaClient } from "@prisma/client";

import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

const { user } = new PrismaClient();

//login, return user if email and password are ok
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let userFetched = await user.findUnique({
      where: {
        email,
      },
    });

    if (!userFetched) return next(new Error("Invalid email"));

    if (!passwordCompareSync(password, userFetched.passwordHash)) {
      return next(new Error("Invalid password"));
    }

    return res.json(userFetched);
  } catch (e) {
    return next(e);
  }
};

// get all users (testing)
export const getUsers = async (req, res, next) => {
  try {
    let users = await user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.json(users);
  } catch (e) {
    return next(e);
  }
};

// create user (sign up)
export const createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    let newUser = await user.create({
      data: {
        name,
        passwordHash: hashPassword(password),
        email,
      },
    });

    return res.json(newUser);
  } catch (e) {
    return next(e);
  }
};
