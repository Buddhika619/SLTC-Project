import { v4 as uuidv4 } from "uuid";
import {
  createTeachersCourses,
  getTeachersCoursesList,
  getTeachersCoursesByTeacherID,
  updateTeachersCourses,
  deleteTeachersCourses,
} from "../models/teacherCoursesModel.js";

// @desc Create a new teacher-course relationship
// @route POST /api/teachers-courses
// @access admin

const createTeachersCoursesHandler = async (req, res, next) => {
  try {
    const { teacherID, courseID } = req.body;

    if (!teacherID || !courseID) {
      res.status(400);
      throw new Error("Fields cannot be empty");
    }

    const relationship = await createTeachersCourses(teacherID, courseID);
    res.status(201).json(relationship);
  } catch (error) {
    next(error);
  }
};

// @desc View all teacher-course relationships
// @route GET /api/teachers-courses
// @access admin

const getTeachersCoursesListHandler = async (req, res, next) => {
  try {
    const relationships = await getTeachersCoursesList();
    res.status(200).json(relationships);
  } catch (error) {
    next(error);
  }
};

// @desc View teacher-course relationships by teacherID
// @route GET /api/teachers-courses/:teacherID/:courseID
// @access admin

const getTeachersCoursesByTeacherIDHandler = async (req, res, next) => {
    try {
      const { teacherID, courseID } = req.params;
      const relationships = await getTeachersCoursesByTeacherID(teacherID, courseID);
      res.status(200).json(relationships);
    } catch (error) {
      next(error);
    }
  }

// @desc Update teacher-course relationship
// @route PUT /api/teachers-courses/:teacherID/:courseID
// @access admin

const updateTeachersCoursesHandler = async (req, res, next) => {
  try {
    const { teacherID, courseID } = req.params;
    const updates = req.body;
    const relationship = await updateTeachersCourses(teacherID, courseID, updates);
    res.status(200).json(relationship);
  } catch (error) {
    next(error);
  }
};

// @desc Delete teacher-course relationship
// @route DELETE /api/teachers-courses/:teacherID/:courseID
// @access admin

const deleteTeachersCoursesHandler = async (req, res, next) => {
  try {
    const { teacherID, courseID } = req.params;
    await deleteTeachersCourses(teacherID, courseID);
    res.status(200).json({ msg: "Delete success" });
  } catch (error) {
    next(error);
  }
};

export {
  createTeachersCoursesHandler,
  getTeachersCoursesListHandler,
  getTeachersCoursesByTeacherIDHandler,
  updateTeachersCoursesHandler,
  deleteTeachersCoursesHandler,
};
