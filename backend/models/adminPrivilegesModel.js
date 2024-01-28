import { DataTypes } from "sequelize";
import db from "../config/db.js";
import User from "./User.js"; // Adjust the path based on your actual file structure

const Student = db.define(
  "student",
  {
    studentID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

export default Student;
