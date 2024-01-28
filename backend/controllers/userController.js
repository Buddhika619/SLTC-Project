import asyncHandler from "express-async-handler";
import generateToken from "../Utils/generateToken.js";

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import User, {
  createUser,
  findAllUsers,
  finduserByEmail,
} from "../models/userModel.js";
import CustomValidator from "../Utils/validator.js";
import NonAcademicStaff, {
  getStaffByUserID,
} from "../models/nonAcademicStaffModel.js";
import Teacher, {
  getTeacherByUserId,
  getTeacherList,
} from "../models/teacherModel.js";
import Student, {
  getStudentByUserId,
  getStudentList,
} from "../models/studentModel.js";
import Faculty, { findFacultyByDepartment } from "../models/facultyModel.js";
import { NONAC, TEACHER, STUDENT } from "../config/constants.js";

// @desc  Auth user & get token
// @route POST /api/users/login/:role
// @access Public
const authUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!["NONAC", "STUDENT", "TEACHER"].includes(req.params.role)) {
      res.status(400);
      throw new Error("Invalid user Type");
    }
    if (!email || !password) {
      res.status(400);
      throw new Error("Fields can not be empty");
    }

    if (!CustomValidator.validateEmail(email)) {
      res.status(400);
      throw new Error("Invalid Email");
    }

    if (!CustomValidator.validatePassword(password)) {
      res.status(400);
      throw new Error("Invalid Password");
    }

    const user = await finduserByEmail(email);

    if (!user) {
      res.status(400);
      throw new Error("User does not exists");
    }

    if (!user.isApproved) {
      res.status(400);
      throw new Error("Your account is pending for admin approval");
    }

    const bcryptPW = user.password;
    console.log(user.password);

    if (await bcrypt.compare(password, bcryptPW)) {
      let userData;

      // Fetch role-specific data
      if (req.params.role === "STUDENT") {
        userData = await getStudentByUserId(user.userID);
      } else if (req.params.role === "TEACHER") {
        userData = await getTeacherByUserId(user.userID);
      } else if (req.params.role === "NONAC") {
        userData = await getStaffByUserID(user.userID);
      }

      // Check if role-specific data is found
      if (userData) {
        return res
          .status(200)
          .json({
            userData,
            role: req.params.role,
            token: generateToken(user.userID),
          });
      } else {
        res.status(400);
        throw new Error("Can not find a user");
      }
    } else {
      res.status(400);
      throw new Error("Invalid Password");
    }
  } catch (err) {
    next(err);
  }
};

// @desc  Register a new User
// @route POST /api/users/
// @access Public

const registerUser = async (req, res, next) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Fields can not be empty");
    }

    if (!CustomValidator.validateEmail(email)) {
      res.status(400);
      throw new Error("Invalid Email");
    }

    if (!CustomValidator.validatePassword(password)) {
      res.status(400);
      throw new Error("Invalid Password");
    }

    const existingUser = await finduserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    let userID = uuidv4();

    const salt = await bcrypt.genSalt(10);

    const hashedPW = await bcrypt.hash(password, salt);

    await createUser(firstName, userID, lastName, email, hashedPW);

    res.status(201).json({ msg: "Successfull Registration!" });
  } catch (err) {
    next(err);
  }
};

// @desc  list all users
// @route GET /api/users/
// @access private

const getUsers = async (req, res, next) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// @desc  updateUser
// @route PUT /api/users/:id
// @access private

const updateUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      isAdmin,
      isApproved,
      faculty,
      role,
      date,
    } = req.body;

    // Validate email and password
    if (password && !CustomValidator.validateEmail(email)) {
      res.status(400);
      throw new Error("Invalid Email");
    }

    if (email && !CustomValidator.validatePassword(password)) {
      res.status(400);
      throw new Error("Invalid password");
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Check if faculty exists
    const facultyRes = await findFacultyByDepartment(faculty);

    if (!facultyRes) {
      res.status(400);
      throw new Error("Faculty does not exist");
    }

    if (!firstName || !lastName || !email || !role || !faculty || !date) {
      res.status(400);
      throw new Error("Fill all required fileds");
    }

    // Update user properties
    const salt = await bcrypt.genSalt(10);
    user.set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      isAdmin: typeof isAdmin === "boolean" ? isAdmin : user.isAdmin,
      password: password ? await bcrypt.hash(password, salt) : user.password,
      isApproved:
        typeof isApproved === "boolean" ? isApproved : user.isApproved,
    });

    // Update role-specific information
    const updateRoleInformation = async (Model, roleType) => {
      const roleInstance = await Model.findOne({
        where: { userID: req.params.id },
      });

      if (!roleInstance) {
        await Model.create({
          userID: req.params.id,
          facultyID: facultyRes.facultyID,
          enrollmentDate: new Date(date),
          [`${roleType}ID`]: uuidv4(),
        });
      } else {
        roleInstance.set({
          facultyID: facultyRes.facultyID,
          enrollmentDate: new Date(date),
        });

        await roleInstance.save();
      }
    };

    // Handle role-specific updates
    if (role === "STUDENT") {
      await updateRoleInformation(Student, "student");
    } else if (role === "TEACHER") {
      await updateRoleInformation(Teacher, "teacher");
    } else if (role === "NONAC") {
      await updateRoleInformation(NonAcademicStaff, "nonac");
    }

    await user.save();

    // Respond with updated user details
    res.status(200).json({
      userID: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      email: user.email,
      isApproved: user.isApproved,
    });
  } catch (err) {
    next(err);
  }
};

// @desc  customer details
// @route GET /api/users/:id
// @access private

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  // const [user] = await db.query('SELECT * FROM users WHERE userID = (:id)', {
  //   replacements: { id: req.params.id },
  //   type: db.QueryTypes.SELECT,
  // });

  if (user) {
    res.status(200).json({
      userID: user.userID,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isAdmin: user.role,
      isApproved: user.isApproved,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  customer details
// @route GET /api/users/teachers
// @access private

const getTeachersList = asyncHandler(async (req, res) => {
  const teachers = await getTeacherList();

  res.status(200).json(teachers);
});

// @desc  customer details
// @route GET /api/users/students
// @access private

const studentList = asyncHandler(async (req, res) => {
  const students = await getStudentList();

  res.status(200).json(students);
});

export {
  authUser,
  registerUser,
  getUsers,
  updateUser,
  getSingleUser,
  studentList,
  getTeachersList
};
