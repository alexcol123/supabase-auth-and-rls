# Stranger RLS

YouTube tutorial: Learn Row Level Security with Supabase in 10 minutes.

## What This Is

A hands-on tutorial where viewers:
1. Copy SQL from `supabase/schema.sql` into Supabase SQL Editor
2. See changes reflect live in the React app
3. Learn PostgreSQL concepts: tables, RLS, policies, functions, triggers

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth + PostgreSQL)

## Project Structure

```
src/
  App.tsx                    # Landing page (Stranger RLS)
  components/
    Navbar.tsx               # Nav with auth-aware Sign In/Out
    Dashboard.tsx            # User dashboard
    SignIn.tsx               # Login page
    SignUp.tsx               # Registration page
  Context/AuthContext.tsx    # Auth state management
  supabaseClient.ts          # Supabase connection
supabase/
  schema.sql                 # THE TUTORIAL - run step by step
```

## Test Users (Stranger Things)

| Role  | Name           | Email              | Password |
|-------|----------------|--------------------|----------|
| Admin | Jim Hopper     | jim@hawkins.com    | password |
| User  | Eleven Hopper  | eleven@hawkins.com | password |
| User  | Max Mayfield   | max@hawkins.com    | password |

## Key RLS Concepts Taught

1. `ENABLE ROW LEVEL SECURITY` - Lock down tables
2. `CREATE POLICY` - Define access rules
3. `auth.uid()` - Get current user from JWT
4. `SECURITY DEFINER` - Bypass RLS in functions
5. Admin checks with `EXISTS` subqueries

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server
```

## Environment Variables

Copy `.env.example` to `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
