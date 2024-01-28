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

router.route("/single").post(basicAuth, getAttendanceByIdHandler);

router
  .route("/:id")
  .put(basicAuth, adminAccess, updateAttendanceHandler)
  .post(basicAuth, deleteAttendanceHandler);

export default router;
