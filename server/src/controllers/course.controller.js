import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUserCourses = async (req, res) => {
  const userId = req.userId;
  try {
    const courses = await prisma.course.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!courses) {
      console.log("No courses found");
    }

    res.status(200).json({ message: "Courses fetched successfully", courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();

    if (!courses) {
      console.log("No courses found");
    }

    res.status(200).json({ message: "Courses fetched successfully", courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      console.log("No course found");
    }

    res.status(200).json({ message: "course fetched successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export const createCourse = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const courses = await prisma.course.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!courses) {
      console.log("Something went wrong");
    }

    res.status(201).json({ message: "Course created successfully", courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateCourse = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    const course = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    if (!course) {
      console.log("Something went wrong");
    }

    res.status(200).json({
      message: "Updated course successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.delete({
      where: {
        id,
      },
    });

    if (!course) {
      console.log("Something went wrong");
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
