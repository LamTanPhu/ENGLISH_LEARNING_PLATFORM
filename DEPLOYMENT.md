# Deployment (Server + Client)

This guide shows how to deploy the NestJS server and React client with minimal cost.

## 0) Prereqs
- A GitHub repo with this project root containing `server/` and `client/`
- MongoDB connection string (MongoDB Atlas free-tier works)

## 1) Deploy Server (Render)
Render is straightforward for Node apps. Note: Render may require a paid Starter plan for always-on web services. Static hosting remains free.

1. Push your code to GitHub
2. In Render, create a new Web Service → “Build from a repo”
3. Render will detect `render.yaml` at repo root and configure the service
4. In the service settings, set environment variables:
   - `PORT` = `3000`
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = a strong secret
5. Render will run:
   - Build: `cd server && npm ci && npm run build`
   - Start: `cd server && npm run start:prod`
6. After deploy, copy the public URL (e.g., `https://your-app.onrender.com`)

## 2) Deploy Client (Vercel) – recommended
Vercel free-tier is suitable for static SPA.

1. Import the `client/` folder as a project
2. Set Project Settings → Environment Variables:
   - `VITE_API_URL` = your server URL (`https://your-app.onrender.com`)
3. Vercel will use `client/vercel.json` and build with `npm run build`
4. After deploy, verify the app loads and API calls succeed

## 3) Deploy Client (Netlify) – alternative
1. Create a Netlify site from Git
2. Build command: `npm run build` (in `client/`)
3. Publish directory: `dist`
4. Set Env Var `VITE_API_URL` in Site settings (or use `client/netlify.toml`)

## Notes on Free Tiers (as of 2025)
- Vercel/Netlify: free for static sites, limits apply (bandwidth/build minutes)
- Render: web services may require paid plan; verify current pricing
- MongoDB Atlas: offers a free tier suitable for MVPs

## Post-deploy checks
- Server: `GET /` should respond (health)
- Client: `VITE_API_URL` points to the server; login/register works; protected routes load
