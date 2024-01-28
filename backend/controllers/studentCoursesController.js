import { v4 as uuidv4 } from "uuid";
import {
  createStudentCourseRelationship,
  getAllStudentCourseRelationships,
  getStudentCourseRelationshipByIds,
  updateStudentCourseRelationshipByIds,
  deleteStudentCourseRelationshipByIds,
} from "../models/studentCourseModel.js";

// @desc Create a new student-course relationship
// @route POST /api/students-courses
// @access admin

const createStudentCourseRelationshipHandler = async (req, res, next) => {
  try {
    const { studentID, courseID } = req.body;

    if (!studentID || !courseID) {
      res.status(400);
      throw new Error("Fields cannot be empty");
    }

    const relationship = await createStudentCourseRelationship(studentID, courseID);
    res.status(201).json(relationship);
  } catch (error) {
    next(error);
  }
};

// @desc View all student-course relationships
// @route GET /api/students-courses
// @access admin

const getAllStudentCourseRelationshipsHandler = async (req, res, next) => {
  try {
    const relationships = await getAllStudentCourseRelationships();
    res.status(200).json(relationships);
  } catch (error) {
    next(error);
  }
};

// @desc View single student-course relationship
// @route GET /api/students-courses/:studentID/:courseID
// @access admin

const getStudentCourseRelationshipByIdsHandler = async (req, res, next) => {
  try {
    const { studentID, courseID } = req.params;
    const relationship = await getStudentCourseRelationshipByIds(studentID, courseID);
    res.status(200).json(relationship);
  } catch (error) {
    next(error);
  }
};

// @desc Update student-course relationship
// @route PUT /api/students-courses/:studentID/:courseID
// @access admin

const updateStudentCourseRelationshipByIdsHandler = async (req, res, next) => {
  try {
    const { studentID, courseID } = req.params;
    const updates = req.body;
    const relationship = await updateStudentCourseRelationshipByIds(studentID, courseID, updates);
    res.status(200).json(relationship);
  } catch (error) {
    next(error);
  }
};

// @desc Delete student-course relationship
// @route DELETE /api/students-courses/:studentID/:courseID
// @access admin

const deleteStudentCourseRelationshipByIdsHandler = async (req, res, next) => {
  try {
    const { studentID, courseID } = req.params;
    await deleteStudentCourseRelationshipByIds(studentID, courseID);
    res.status(200).json({ msg: "Delete success" });
  } catch (error) {
    next(error);
  }
};

export {
  createStudentCourseRelationshipHandler,
  getAllStudentCourseRelationshipsHandler,
  getStudentCourseRelationshipByIdsHandler,
  updateStudentCourseRelationshipByIdsHandler,
  deleteStudentCourseRelationshipByIdsHandler,
};
