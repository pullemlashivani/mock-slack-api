import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LICENSE = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/license.json")));

const router = Router();

// GET /license.info
router.get("/license.info", (_req, res) => {
  res.json({ ok: true, license: LICENSE });
});

export default router;
