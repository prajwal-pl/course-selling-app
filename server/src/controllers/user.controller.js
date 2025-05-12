import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select:{
        role: "seller"
      }
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


export const createUser = async (req, res)=>{
  try {
    const {username, email, password, role} = req.body;

    const user = await prisma.user.create({
      date:{
        username,
        email, 
        password,
        role
      }
    })

    if(!user){
      ret
    }

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}