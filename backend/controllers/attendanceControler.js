import {
  getAttendanceList,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from "../models/attendanceModel.js";
import { v4 as uuidv4 } from "uuid";

// @desc Get all attendance records
// @route GET /api/attendance
// @access admin

const getAttendanceListHandler = async (req, res, next) => {
  try {
    const attendanceList = await getAttendanceList();
    res.status(200).json(attendanceList);
  } catch (error) {
    next(error);
  }
};

// @desc Get a single attendance record by ID
// @route POST /api/attendance/single
// @access ownData

const getAttendanceByIdHandler = async (req, res, next) => {
  const { studentID, sessionID } = req.body;
  try {
    if (req.user.userID === req.params.id || req.user.isAdmin) {
      const attendance = await getAttendanceById(studentID, sessionID);
      if (!attendance) {
        res.status(404);
        throw new Error("Attendance not found");
      }
      res.status(200).json(attendance);
    } else {
      res.status(401);
      throw new Error("Not Authorized");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Create a new attendance record
// @route POST /api/attendance
// @access admin

const createAttendanceHandler = async (req, res, next) => {
  try {
    const { studentID, sessionID, isPresent } = req.body;

    if (req.user.userID === req.params.id || req.user.isAdmin) {
      const createdAttendance = await createAttendance({
        studentID,
        sessionID,
        isPresent,
      });
      res.status(201).json(createdAttendance);
    } else {
      res.status(401);
      throw new Error("Not Authorized");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Update an attendance record by ID
// @route PUT /api/attendance/:id
// @access admin

const updateAttendanceHandler = async (req, res, next) => {
  try {
    const { studentID, sessionID, isPresent } = req.body;

    const updatedAttendance = await updateAttendance(studentID, sessionID, {
      studentID,
      sessionID,
      isPresent,
    });
    res.status(200).json(updatedAttendance);
  } catch (error) {
    next(error);
  }
};

// @desc Delete an attendance record by ID
// @route POST /api/attendance/delete
// @access admin

const deleteAttendanceHandler = async (req, res, next) => {
  try {
    const { studentID, sessionID } = req.body;
    const deletedAttendance = await deleteAttendance(studentID, sessionID);
    res.status(200).json(deletedAttendance);
  } catch (error) {
    next(error);
  }
};

export {
  getAttendanceListHandler,
  getAttendanceByIdHandler,
  createAttendanceHandler,
  updateAttendanceHandler,
  deleteAttendanceHandler,
};
