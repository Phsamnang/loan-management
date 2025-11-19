import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();  // <-- MUST be first
const DATABASE_URL =
  process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ alter: false });
      console.log("✅ Models synchronized");
    }
  } catch (error) {
    console.error("❌ DB connection error:", error);
    throw error;
  }
};

export { sequelize };
