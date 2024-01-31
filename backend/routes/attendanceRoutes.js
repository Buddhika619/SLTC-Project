import express from "express";
const router = express.Router();

import {
  getAttendanceListHandler,
  getAttendanceByIdHandler,
  createAttendanceHandler,
  updateAttendanceHandler,
  deleteAttendanceHandler,
  getAttendanceForSingleStudentHandler
} from "../controllers/attendanceControler.js";

import { basicAuth, adminAccess } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(basicAuth, adminAccess, getAttendanceListHandler)
  .post(basicAuth, createAttendanceHandler);

router
  .route("/student/:id")
  .get(basicAuth, adminAccess, getAttendanceForSingleStudentHandler);

router
  .route("/:studentID/:sessionID")
  .get(basicAuth, adminAccess, getAttendanceByIdHandler)
  .put(basicAuth, adminAccess, updateAttendanceHandler)
  .delete(basicAuth, adminAccess, deleteAttendanceHandler);

export default router;
