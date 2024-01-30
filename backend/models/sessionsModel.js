import { DataTypes, Op } from "sequelize";
import db from "../config/db.js";
import Course from "./courseModel.js";
import SessionLocation from "./sessionLocationModel.js";
import Teacher from "./teacherModel.js";

const Session = db.define("session", {
  sessionID: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  courseID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  minutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  // Add other session-related fields as needed
});

// Define association with Course model
Session.belongsTo(Course, { foreignKey: "courseID", onDelete: "CASCADE" });
Session.belongsTo(SessionLocation, {
  foreignKey: "locationID",
  onDelete: "CASCADE",
});

export default Session;

// reusable queries =================================================================

// Create a new session
export const createSession = async (
  sessionID,
  courseID,
  dateTime,
  minutes,
  locationID
) => {
  const session = await Session.create({
    sessionID,
    courseID: courseID,
    dateTime: dateTime,

    minutes: minutes,
    locationID: locationID,
  });

  return session;
};

export const getParallelSessions = async (dateTime, minutes) => {
  const originalDate = new Date(dateTime);
  const utcDate = new Date(originalDate.toUTCString());
  
  // Add minutes to the UTC date to get the end time
  const endDate = new Date(utcDate.getTime() + minutes * 60000);

  const results = await Session.findAll({
    where: {
      dateTime: {
        [Op.between]: [utcDate, endDate],
      },
    },

    include: [
      {
        model: Course, // Assuming you have a Course model

      },
      {
        model: SessionLocation, // Assuming you have a Location model

      },
    ]
  });

  return results;
};
// Read all sessions
export const getAllSessions = async () => {
  const sessions = await Session.findAll({
    include: [
      {
        model: Course,
        // attributes: ["courseID", "courseName", "teacherID", "facultyID", "year"],
        include: [
          {
            model: Teacher,
            include: [
              {
                model: userID,
                exclude: ["password"],
              },
            ],
          },
        ],
      },
      {
        model: SessionLocation,
        // attributes: ["locationID", "name"],
      },
    ],
  });

  return sessions;
};

// Read session by ID
export const getSessionById = async (id) => {
  const session = await Session.findByPk(id, {
    include: [
      {
        model: Course,
        include: [
          {
            model: Teacher,
            include: [
              {
                model: userID,
                exclude: ["password"],
              },
            ],
          },
        ],
      },
      {
        model: SessionLocation,
      },
    ],
  });

  return session;
};

// Update session by ID
export const updateSessionById = async (id, updates) => {
  const session = await Session.findByPk(id);

  if (!session) {
    throw new Error("Session not found");
  }

  // You can add more specific validations or modify the updates as needed
  await session.update(updates);

  return session;
};

// Delete session by ID
export const deleteSessionById = async (id) => {
  const session = await Session.findByPk(id);

  if (!session) {
    throw new Error("Session not found");
  }

  await session.destroy();

  return session;
};
