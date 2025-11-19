// src/app.js

import express from "express";
import routes from "./routes/index.js";
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);
// Example route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'UP' });
// });

// Catch-all (Express 5 compatible)
app.use((req, res) => {
  res.status(404).json({ error: "Path not found, try again" });
});

export default app;