import express from "express";
const router = express.Router();

import {
  createStudentCourseRelationshipHandler,
  getAllStudentCourseRelationshipsHandler,
  getStudentCourseRelationshipByIdsHandler,
  updateStudentCourseRelationshipByIdsHandler,
  deleteStudentCourseRelationshipByIdsHandler,
} from "../controllers/studentCoursesController.js";

import { basicAuth, adminAccess } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(basicAuth, adminAccess, createStudentCourseRelationshipHandler)
//   .get(basicAuth, adminAccess, getAllStudentCourseRelationshipsHandler);

// router
//   .route("/:studentID/:courseID")
//   .get(basicAuth, adminAccess, getStudentCourseRelationshipByIdsHandler)
//   .put(basicAuth, adminAccess, updateStudentCourseRelationshipByIdsHandler)
//   .delete(basicAuth, adminAccess, deleteStudentCourseRelationshipByIdsHandler);

export default router;
