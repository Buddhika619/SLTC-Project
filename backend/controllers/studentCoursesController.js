import { v4 as uuidv4 } from "uuid";
import {
  createStudentCourseRelationship,
  getAllStudentCourseRelationships,
  getStudentCourseRelationshipByIds,
  updateStudentCourseRelationshipByIds,
  deleteStudentCourseRelationshipByIds,
} from "../models/studentCourseModel.js";
import { getStudentByPK, getStudentByUserId } from "../models/studentModel.js";
import { getCourseById } from "../models/courseModel.js";

// @desc Create a new student-course relationship
// @route POST /api/students-courses
// @access admin

const createStudentCourseRelationshipHandler = async (req, res, next) => {
  try {
    const { userID, courseID } = req.body;
    let relationship;
    if (!userID || !courseID) {
      res.status(400);
      throw new Error("Fields cannot be empty");
    }

    const student = await getStudentByUserId(userID);
    const course = await getCourseById(courseID);

    if(student && course) {
      if(student.year === course.year && student.facultyID == course.facultyID) {
     
         relationship = await createStudentCourseRelationship(student.studentID, courseID);
      }else {
        res.status(400);
        throw new Error("Student does not eligible to this course");
      }
    } else {
      res.status(400);
        throw new Error("Invalid IDs");
    }
  


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
