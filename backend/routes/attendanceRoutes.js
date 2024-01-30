import express from "express";
const router = express.Router();

import {
  getAttendanceListHandler,
  getAttendanceByIdHandler,
  createAttendanceHandler,
  updateAttendanceHandler,
  deleteAttendanceHandler,
} from "../controllers/attendanceControler.js";

import { basicAuth, adminAccess } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(basicAuth, adminAccess, getAttendanceListHandler)
  .post(basicAuth, createAttendanceHandler);


  router
  .route("/:studentID/:courseID")
  .get(basicAuth, adminAccess, getAttendanceByIdHandler)
  .put(basicAuth, adminAccess, updateAttendanceHandler)
  .delete(basicAuth, adminAccess, deleteAttendanceHandler);


export default router;
