import express from "express";
const router = express.Router();

import {
  createCourseHandler,
  getAllCoursesHandler,
  getCourseByIdHandler,
  updateCourseByIdHandler,
  deleteCourseByIdHandler,
} from "../controllers/courseController.js";

import { basicAuth, adminAccess } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(basicAuth, adminAccess, createCourseHandler)
  // .get(basicAuth, adminAccess, getAllCoursesHandler);

// router
//   .route("/:id")
//   .get(basicAuth, adminAccess, getCourseByIdHandler)
//   .put(basicAuth, adminAccess, updateCourseByIdHandler)
//   .delete(basicAuth, adminAccess, deleteCourseByIdHandler);

export default router;

