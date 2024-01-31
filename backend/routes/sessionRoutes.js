import express from "express";
const router = express.Router();

import {
  createSessionHandler,
  getSessionByIdHandler,
  updateSessionByIdHandler,
  getAllSessionsHandler,
  deleteSessionByIdHandler,
} from "../controllers/sessionController.js";

import { basicAuth, adminAccess } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(basicAuth, adminAccess, createSessionHandler)
  .get(basicAuth, adminAccess, getAllSessionsHandler);

router
  .route("/:id")
  .get(basicAuth, adminAccess, getSessionByIdHandler)
  .put(basicAuth, adminAccess, updateSessionByIdHandler)
  .delete(basicAuth, adminAccess, deleteSessionByIdHandler);

export default router;
