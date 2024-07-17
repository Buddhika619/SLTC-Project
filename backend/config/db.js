import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.".cyan.underline);
    await db.sync(); // Use force: true only for development, as it drops existing tables
    console.log("Tables synced successfully.".cyan.underline);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { connectDB };
