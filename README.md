# Mock Slack API (Users & License)

A tiny Express.js server that simulates three Slack-like endpoints so you can test integrations without a real Slack tenant.

## Endpoints
- `GET /users.list?limit=<n>&cursor=<userId>&exclude_bots=true|false`
- `GET /users.info?user=<userId>`
- `GET /license.info`

Bonus: open `http://localhost:3000/dashboard.html` for a minimal UI that calls these endpoints.

## Quick start
1. Install Node.js LTS (18+ recommended).
2. In a terminal:
   ```bash
   cd mock-slack-api
   npm install
   npm run dev
   ```
3. Try endpoints:
   ```bash
   curl http://localhost:3000/users.list
   curl "http://localhost:3000/users.info?user=U102"
   curl http://localhost:3000/license.info
   ```
4. Open the dashboard at `http://localhost:3000/dashboard.html`.

## Data
Data is served from `src/data/users.json` and `src/data/license.json`. Modify these files to change responses.
