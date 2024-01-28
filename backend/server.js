import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import helmet from "helmet";

import FacuultyRoutes from "./routes/facutlyRoutes.js";

import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import db from "./config/db.js";

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Connection has been established successfully.".cyan.underline);
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//parse req.body GET/POST
app.use(express.json());
app.use(helmet());
//routes
app.use("/api/users", userRoutes);
app.use("/api/faculty", FacuultyRoutes);

//error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
