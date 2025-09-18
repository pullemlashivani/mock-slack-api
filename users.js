import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/users.json")));

const router = Router();

// GET /users.list?limit=3&cursor=U101&exclude_bots=true
router.get("/list", (req, res) => {
  let { limit = 100, cursor, exclude_bots = "false" } = req.query;
  limit = Math.min(parseInt(limit, 10) || 100, 200);

  let startIdx = 0;
  if (cursor) {
    const idx = USERS.findIndex(u => u.id === cursor);
    startIdx = idx >= 0 ? idx + 1 : 0;
  }

  let rows = USERS.slice(startIdx, startIdx + limit);
  if (exclude_bots === "true") rows = rows.filter(u => !u.is_bot);

  const next = startIdx + limit < USERS.length ? USERS[startIdx + limit - 1].id : "";

  res.json({
    ok: true,
    members: rows,
    response_metadata: { next_cursor: next }
  });
});

// GET /users.info?user=U101
router.get("/info", (req, res) => {
  const { user } = req.query;
  if (!user) return res.status(400).json({ ok: false, error: "missing_user_param" });

  const found = USERS.find(u => u.id === user);
  if (!found) return res.status(404).json({ ok: false, error: "user_not_found" });

  res.json({ ok: true, user: found });
});

export default router;
