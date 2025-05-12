import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        role: "seller",
      },
    });

    if (!users) {
      return res.status(404).json({ message: "No Users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "No Users found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        role,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Error creating user" });
    }
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    if (!user) {
      res.status(400).json({ message: "No user found" });
    }

    return res.status(200).json({ message: "Updated successfully", user });
  } catch (error) {
    console, log(error);
    res.status(500).json({ message: "Updating user failed" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(400).json({ message: "Something went wrong" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Deleting user failed" });
  }
};
