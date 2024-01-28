import { v4 as uuidv4 } from "uuid";
import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSessionById,
  deleteSessionById,
} from "../models/sessionModel.js";

// @desc create session
// @route POST /api/session
// @access admin

const createSessionHandler = async (req, res, next) => {
  try {
    const { courseID, date, startTime, minutes, locationID } = req.body;

    if (!courseID || !date || !startTime || !minutes || !locationID) {
      res.status(400);
      throw new Error("Fields cannot be empty");
    }

    const session = await createSession(uuidv4(), courseID, date, startTime, minutes, locationID);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

// @desc view single session
// @route GET /api/session/:id
// @access ownData

const getSessionByIdHandler = async (req, res, next) => {
  try {
    const session = await getSessionById(req.params.id);
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

// @desc update session
// @route PUT /api/session/:id
// @access admin

const updateSessionByIdHandler = async (req, res, next) => {
  const updates = req.body;
  try {
    const session = await updateSessionById(req.params.id, updates);

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

// @desc get all sessions
// @route GET /api/session
// @access admin

const getAllSessionsHandler = async (req, res, next) => {
  try {
    const sessions = await getAllSessions();

    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

// @desc delete session
// @route DELETE /api/session/:id
// @access admin

const deleteSessionByIdHandler = async (req, res, next) => {
  try {
    await deleteSessionById(req.params.id);

    res.status(200).json({ msg: "delete success" });
  } catch (error) {
    next(error);
  }
};

export {
  createSessionHandler,
  getSessionByIdHandler,
  updateSessionByIdHandler,
  getAllSessionsHandler,
  deleteSessionByIdHandler,
};
