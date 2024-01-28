import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Teacher from "./teacherModel.js";
import Course from "./courseModel.js";
import User from "./userModel.js";

const TeachersCourses = db.define("teachers_courses", {
  teacherID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  courseID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  // Define a composite primary key
  primaryKey: true,
});

// Define associations with Teacher and Course models
TeachersCourses.belongsTo(Teacher, { foreignKey: "teacherID", onDelete: "CASCADE",  });
TeachersCourses.belongsTo(Course, { foreignKey: "courseID", onDelete: "CASCADE",  });

export default TeachersCourses;


// reusable queries =============================================================

export const createTeachersCourses = async (teacherID, courseID) => {
  const createdTeachersCourses = await TeachersCourses.create({
    teacherID: teacherID,
    courseID: courseID,
  });
  return createdTeachersCourses;
};

export const getTeachersCoursesList = async () => {
  const teachersCoursesList = await TeachersCourses.findAll({
    include: [
      {
        model: Teacher,
        include : [
          {
            model: User,
            exclude: [password]
          }
        ]
      },
      {
        model: Course,
       
        include: [
          {
            model: Faculty,
          },
        ],
      },
    ],
  });
  return teachersCoursesList;
};

export const getTeachersCoursesByTeacherID = async (teacherID,courseID) => {
  const teachersCoursesList = await TeachersCourses.findAll({
    where: { teacherID: teacherID, courseID: courseID },
    include: [
      {
        model: Teacher,
        include : [
          {
            model: User,
            exclude: [password]
          }
        ]
      },
      {
        model: Course,
       
        include: [
          {
            model: Faculty,
          },
        ],
      },
    ],
  });
  return teachersCoursesList;
};

export const deleteTeachersCourses = async (teacherID, courseID) => {
  const deletedTeachersCourses = await TeachersCourses.destroy({
    where: { teacherID: teacherID, courseID: courseID },
  });
  return deletedTeachersCourses;
};

export const updateTeachersCourses = async (teacherID, courseID, updatedData) => {
  const [numUpdatedRows, updatedRows] = await TeachersCourses.update(updatedData, {
    where: { teacherID: teacherID, courseID: courseID },
    returning: true, // Return the updated rows
  });
  
  return { numUpdatedRows, updatedRows };
};