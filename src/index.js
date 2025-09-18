import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.js";
import licenseRouter from "./routes/license.js";

const app = express();
app.use(cors());
app.use(express.json());

// Serve the bonus dashboard static file from /public
app.use(express.static("public"));

// Routes
app.use("/users", usersRouter);       // /users.list, /users.info
app.use("/", licenseRouter);          // /license.info

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ ok: false, error: "not_found" });
});

// Generic error handler
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "internal_error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mock Slack API running on http://localhost:${PORT}`));
