// server.js

// 1. Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

// 2. Import http module
import http from "http";

// 3. Import Express app
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";


// 4. Import database (now dotenv is already loaded)

// 5. Port
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = () => {
 connectDB().then(() => console.log("✅ Database connected"))
    .catch((error) => {
      console.error("❌ DB connection failed:", error);
      process.exit(1);
    });
  server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
