import { PrismaClient } from "@prisma/client";
import validator from "validator";

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

    // check email
    if (!userFetched) return res.json({ error: "Invalid email" });

    // check password
    if (!passwordCompareSync(password, userFetched.passwordHash)) {
      return res.json({ error: "Invalid password" });
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

// get user by id (auth)
export const getUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    let userFetched = await user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        id: parseInt(id),
      },
    });

    // check if user exists
    if (!userFetched) return next(new Error("Invalid id"));

    return res.json(userFetched);
  } catch (e) {
    return next(e);
  }
};

// create user (sign up)
export const createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    // check if a field is empty
    if (!email || !name || !password) {
      return res.json({ error: "Please fill all the fields correctly" });
    }

    //check valid email
    if (!validator.isEmail(email)) {
      return res.json({ error: "Invalid email" });
    }

    // password length > 6
    if (password.length < 6) {
      return res.json({ error: "Password should be at least 6 characters" });
    }

    const findUser = await user.findUnique({ where: { email } });

    // check if email is already in use
    if (findUser) {
      return res.json({ error: "Email already in use" });
    }

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
