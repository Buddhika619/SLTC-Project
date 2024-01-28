import { v4 as uuidv4 } from "uuid";
import Faculty from "../models/facultyModel.js";

const createFaculty = async (req, res, next) => {
 
  try {
    const { department} = req.body

    if (!department) {
      res.status(400);
      throw new Error("Fields can not be empty");
    }

    const faculty = await Faculty.create({ department,facultyID:uuidv4() });

    res.status(201).json(faculty);

  } catch (error) {
    next(error)
  }
};




const getAllFaculties = async () => {
  try {
    const faculties = await Faculty.findAll();
    return faculties;
  } catch (error) {
    throw error;
  }
};

const getFacultyById = async (facultyID) => {
  try {
    const faculty = await Faculty.findByPk(facultyID);
    return faculty;
  } catch (error) {
    throw error;
  }
};

const updateFaculty = async (facultyID, newDepartment) => {
  try {
    const faculty = await Faculty.findByPk(facultyID);

    if (!faculty) {
      throw new Error("Faculty not found");
    }

    faculty.set({ department: newDepartment });
    await faculty.save();

    return faculty;
  } catch (error) {
    throw error;
  }
};

const deleteFaculty = async (facultyID) => {
  try {
    const faculty = await Faculty.findByPk(facultyID);

    if (!faculty) {
      throw new Error("Faculty not found");
    }

    await faculty.destroy();
    return "Faculty deleted successfully";
  } catch (error) {
    throw error;
  }
};

export {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
