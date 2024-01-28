import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";

const basicAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.id, {
        attributes: ["userID", "email", "isAdmin"],
      });

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const studentAccess = async (req, res, next) => {
  try {
    const data = await Student.getStudentByUserId(req.userID);

    if (data || req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not Authorized as a student");
    }
  } catch {
    console.error(error);
    res.status(401);
    throw new Error("Not Authorized");
  }
};

const teacherAccess = async (req, res, next) => {
  try {
    const data = await Teacher.getTeacherByUserId(req.userID);

    if (data || req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("Not Authorized as a Teacher");
    }
  } catch {
    console.error(error);
    res.status(401);
    throw new Error("Not Authorized");
  }
};


const adminAccess = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an admin");
  }
};

export { basicAuth, studentAccess, teacherAccess, adminAccess };
