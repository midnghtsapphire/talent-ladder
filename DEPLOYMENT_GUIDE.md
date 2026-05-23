# Deployment Guide

## 1) Prerequisites
- Node.js 20+
- npm 10+
- Supabase project
- Vercel account connected to this repository

## 2) Environment configuration
Set the following environment variables in Vercel and local `.env`:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## 3) Local validation
```sh
npm install
npm run lint
npm run test
npm run build
```

## 4) Supabase database
Apply migrations from:
- `supabase/migrations/`

## 5) Vercel deployment
1. Import this repository into Vercel.
2. Set the environment variables.
3. Configure production branch.
4. Deploy.

## 6) Deployment automation reference
Vercel Git integration performs automatic preview/production deployments on commit activity to connected branches.

## 7) Post-deploy smoke checks
- Landing page loads successfully.
- Sign up/sign in modal flows render.
- Dashboard route access works for authenticated users.
- Assessment and grant forms submit expected requests.
