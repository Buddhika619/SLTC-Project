import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Student from "./studentModel.js";
import Session from "./sessionsModel.js";

const Attendance = db.define("attendance", {
  attendanceID: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  studentID: {
    type: DataTypes.UUID,
    allowNull: false, 
  },
  sessionID: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  isPresent: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  // Add other attendance-related fields as needed
});

// Define associations with Student and Session models
Attendance.belongsTo(Student, { foreignKey: "studentID", onDelete: "CASCADE",  });
Attendance.belongsTo(Session, { foreignKey: "sessionID", onDelete: "CASCADE",  });

export default Attendance;
