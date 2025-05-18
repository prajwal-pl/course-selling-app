import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getAllUserCourses,
  getCourseById,
  updateCourse,
} from "../controllers/course.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllUserCourses);
router.get("/:id", verifyToken, getCourseById);
router.get("/all", verifyToken, getAllCourses);
router.post("/", verifyToken, createCourse);
router.put("/update/:id", verifyToken, updateCourse);
router.delete("/delete/:id", verifyToken, deleteCourse);

export default router;
