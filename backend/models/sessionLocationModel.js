// Import necessary modules
import { DataTypes } from "sequelize";
import db from "../config/db.js";

// Define SessionLocation model
const SessionLocation = db.define("session_location", {
  locationID: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  facultyID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

SessionLocation.belongsTo(Faculty, { foreignKey: "facultyID", onDelete: "CASCADE" });

export default SessionLocation;

// reusable queries =================================================================


// Create a new session location
export const createSessionLocation = async (name, facultyID) => {
  const sessionLocation = await SessionLocation.create({
    locationID: uuidv4(),
    name: name,
    facultyID: facultyID,
  });

  return sessionLocation;
};

// Read all session locations
export const getAllSessionLocations = async () => {
  const sessionLocations = await SessionLocation.findAll({
    attributes: ["locationID", "name"],
    include: [
      {
        model: Faculty,
        attributes: ["facultyID", "department"],
      },
    ],
  });

  return sessionLocations;
};

// Read session location by ID
export const getSessionLocationById = async (id) => {
  const sessionLocation = await SessionLocation.findByPk(id, {
    attributes: ["locationID", "name"],
    include: [
      {
        model: Faculty,
        attributes: ["facultyID", "department"],
      },
    ],
  });

  return sessionLocation;
};

// Update session location by ID
export const updateSessionLocationById = async (id, updates) => {
  const sessionLocation = await SessionLocation.findByPk(id);

  if (!sessionLocation) {
    throw new Error("Session location not found");
  }


  await sessionLocation.update(updates);

  return sessionLocation;
};

// Delete session location by ID
export const deleteSessionLocationById = async (id) => {
  const sessionLocation = await SessionLocation.findByPk(id);

  if (!sessionLocation) {
    throw new Error("Session location not found");
  }

  await sessionLocation.destroy();

  return sessionLocation;
};