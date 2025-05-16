import express from "express";
import { getAllCourses } from "../controllers/course.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllCourses);

export default router;
