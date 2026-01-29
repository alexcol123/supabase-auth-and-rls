# Supabase Auth & RLS Tutorial

A React application demonstrating Supabase authentication and Row Level Security (RLS).

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Supabase (Auth + Database)
- React Router

## What's Been Implemented

### 1. Supabase Client Setup

```
src/supabaseClient.ts
```

Configured Supabase client using environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2. Auth Context

```
src/Context/AuthContext.tsx
```

A fully typed authentication context providing:

| Function | Description |
|----------|-------------|
| `signUpNewUser()` | Register with email, password, first/last name |
| `signIn()` | Login with email/password |
| `signOut()` | Logout and clear session |
| `session` | Current user object or null |
| `loading` | Auth state loading indicator |

**Key features:**
- TypeScript interfaces for type safety
- `onAuthStateChange` listener for real-time auth updates
- Proper cleanup on unmount
- Handles login, logout, and token refresh events

### 3. Components

| Component | Path | Description |
|-----------|------|-------------|
| `SignUp` | `/sign-up` | Registration form with first/last name |
| `SignIn` | `/sign-in` | Login form with error handling |
| `Dashboard` | `/dashboard` | Protected page with sign out button |
| `Layout` | - | Wraps routes with Navbar |
| `Navbar` | - | Navigation component |

### 4. Routing

```
src/router.tsx
```

```
/           → Home (App)
/sign-in    → Sign In
/sign-up    → Sign Up
/dashboard  → Dashboard
```

## Project Structure

```
src/
├── Context/
│   └── AuthContext.tsx    # Auth state management
├── components/
│   ├── Dashboard.tsx      # Protected dashboard
│   ├── Layout.tsx         # Layout wrapper
│   ├── Navbar.tsx         # Navigation
│   ├── SignIn.tsx         # Login form
│   └── SignUp.tsx         # Registration form
├── App.tsx                # Home page
├── main.tsx               # Entry point
├── router.tsx             # Route definitions
└── supabaseClient.ts      # Supabase config
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create `.env`:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run development server

```bash
npm run dev
```

## Auth Flow

```
User signs up/in → Supabase returns session + tokens
                 → Stored in localStorage automatically
                 → onAuthStateChange fires
                 → AuthContext updates session state
                 → UI re-renders with user data
```

## Next Steps: Row Level Security (RLS)

RLS will be implemented to secure data at the database level.

### Why RLS?

- Security enforced by PostgreSQL, not client code
- Even if someone modifies localStorage, RLS checks the verified JWT
- Fine-grained control over who can read/write specific rows

### Example RLS Policy

```sql
-- Enable RLS on a table
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Users can only see their own todos
CREATE POLICY "Users can view own todos"
ON todos FOR SELECT
USING (auth.uid() = user_id);
```

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview build
npm run lint     # Run linter
```
