import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  getUsers,
  updateUser,
  getSingleUser,
  studentList,
  getTeachersList,
  getUnapprovedUsers,
  getSingleTeacher,
  getSingleStudent,
  getSingleStaffMember,
  getStaffListData,
  deleteUser,
  deleteTeacher,
  delteStudent,
  deleteStaffMemeber,
} from "../controllers/userController.js";
import {
  basicAuth,
  studentAccess,
  teacherAccess,
  adminAccess,
} from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(basicAuth, adminAccess, getUsers);

router.route("/login/:role").post(authUser);

// router.route("/unapproved").get(basicAuth, adminAccess, getUnapprovedUsers);

router
  .route("/:id")
  .get(basicAuth, getSingleUser)
  .put(basicAuth, adminAccess, updateUser)
  // .delete(basicAuth, adminAccess, deleteUser);

// router.route("/teachers").get(basicAuth, adminAccess, getTeachersList);
// router.route("/staff").get(basicAuth, adminAccess, getStaffListData);
// router.route("/students").get(basicAuth, adminAccess, studentList);

// router
//   .route("/teachers/:id")
//   .get(basicAuth, getSingleTeacher)
//   .delete(basicAuth, adminAccess, deleteTeacher);
// router
//   .route("/students/:id")
//   .get(basicAuth, getSingleStudent)
//   .delete(basicAuth, adminAccess, delteStudent);
// router
//   .route("/staff/:id")
//   .get(basicAuth, getSingleStaffMember)
//   .delete(basicAuth, adminAccess, deleteStaffMemeber);

export default router;
