import express from "express";
const router = express.Router();

import {
  createTeachersCoursesHandler,
  getTeachersCoursesListHandler,
  getTeachersCoursesByTeacherIDHandler,
  updateTeachersCoursesHandler,
  deleteTeachersCoursesHandler,
} from "../controllers/teacherCoursesController.js";

import { basicAuth, adminAccess } from "../middleware/authMiddleware.js";

// router
//   .route("/")
//   .post(basicAuth, adminAccess, createTeachersCoursesHandler)
//   .get(basicAuth, adminAccess, getTeachersCoursesListHandler);

// router
//   .route("/:teacherID/:courseID")
//   .get(basicAuth, adminAccess, getTeachersCoursesByTeacherIDHandler)
//   .put(basicAuth, adminAccess, updateTeachersCoursesHandler)
//   .delete(basicAuth, adminAccess, deleteTeachersCoursesHandler);

export default router;
