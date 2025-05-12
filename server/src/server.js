import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello world!");
});

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
