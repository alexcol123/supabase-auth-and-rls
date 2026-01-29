# Supabase RLS Tutorial

Learn how to implement authentication and Row Level Security (RLS) with Supabase in a React application.

## What You'll Learn

- Setting up Supabase in a React project
- Implementing user authentication
- Creating database tables
- Writing Row Level Security (RLS) policies
- Securing your data at the database level

## Tech Stack

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Backend (Auth, Database, RLS)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd supabase-rls

# Install dependencies
npm install

# Start development server
npm run dev
```

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings > API

### 2. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Authentication

Supabase provides multiple auth methods out of the box:

- Email/Password
- Magic Links
- OAuth providers (Google, GitHub, etc.)

### Basic Auth Setup

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Sign out
await supabase.auth.signOut()
```

## Creating Tables

Use the Supabase SQL Editor to create tables:

```sql
-- Example: Create a todos table
CREATE TABLE todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS)

RLS allows you to control access to rows in your database based on the user making the request.

### Why RLS?

- **Security at the database level** - Even if your API is compromised, data stays protected
- **Fine-grained access control** - Control exactly who can read, insert, update, or delete specific rows
- **No backend code needed** - Policies are enforced by PostgreSQL itself

### Enable RLS on a Table

```sql
-- Enable RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;
```

### Writing RLS Policies

#### Users can only see their own todos

```sql
CREATE POLICY "Users can view own todos"
ON todos
FOR SELECT
USING (auth.uid() = user_id);
```

#### Users can only insert todos for themselves

```sql
CREATE POLICY "Users can insert own todos"
ON todos
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

#### Users can only update their own todos

```sql
CREATE POLICY "Users can update own todos"
ON todos
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

#### Users can only delete their own todos

```sql
CREATE POLICY "Users can delete own todos"
ON todos
FOR DELETE
USING (auth.uid() = user_id);
```

### RLS Policy Breakdown

| Clause | Purpose |
|--------|---------|
| `FOR SELECT/INSERT/UPDATE/DELETE` | Which operation the policy applies to |
| `USING (...)` | Filter which existing rows are visible/modifiable |
| `WITH CHECK (...)` | Validate new/updated row data |

### Common RLS Patterns

**Public read, authenticated write:**
```sql
CREATE POLICY "Public read access"
ON posts FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert"
ON posts FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);
```

**Team-based access:**
```sql
CREATE POLICY "Team members can view"
ON projects FOR SELECT
USING (
  team_id IN (
    SELECT team_id FROM team_members
    WHERE user_id = auth.uid()
  )
);
```

## Testing RLS Policies

1. Create a user and sign in
2. Try to access data that belongs to another user
3. The query should return empty results (not an error)

```typescript
// This will only return todos for the authenticated user
const { data: todos } = await supabase
  .from('todos')
  .select('*')
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

## License

MIT
