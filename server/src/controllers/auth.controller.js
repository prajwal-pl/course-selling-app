import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET_KEY;

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.status(403).json("All fields required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    if (!newUser) {
      console.log("Something went wrong");
    }

    res.status(201).json({ message: "New user registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async () => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(403).json("All fields required");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const dbPassword = await existingUser?.password;

    const validPassword = await bcrypt.compare(password, dbPassword);

    if (!existingUser) {
      console.log("No user found, create one!");
    }

    if (!validPassword) {
      console.log("Invalid Credentials! Please try again");
    }

    const token = jwt.sign({ userId: existingUser.id }, jwtSecret, {
      expiresIn: "3d",
    });

    if (!token) {
      console.log("Failed to create token");
    }

    res.status(500).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
