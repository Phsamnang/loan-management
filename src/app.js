// src/app.js

import express from "express";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ status: 'UP' });
// });

// Catch-all (Express 5 compatible)
app.use((req, res) => {
  res.status(404).json({ error: "Path not found, try again" });
});

export default app;