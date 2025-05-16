import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      res.status(403).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.sub;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Bearer "Token"
