-- =============================================
--  SUPABASE RLS TUTORIAL
--  Run each section one at a time in SQL Editor
-- =============================================
-- =============================================
--  STEP 0: Setup Supabase Project
-- =============================================
--  1. Create a Supabase account at https://supabase.com
--  2. Create a new project
--  3. Go to: Project Overview (home icon) > scroll down
--  4. Copy "Project URL" and "Publishable API Key"
--
--     They look like this:
--     VITE_SUPABASE_URL=https://qbxiiwmi....
--     VITE_SUPABASE_ANON_KEY=sb_publishable_uJP8eiqY4.......
--
--  5. Create a .env file in the project root (copy from .env.example)
-- =============================================
--  STEP 1: Create profiles table
-- =============================================
--  This table stores user profile data linked to auth.users
--  The foreign key ensures when a user is deleted, their profile is too
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);
-- =============================================
--  STEP 2: Enable Row Level Security
-- =============================================
--  RLS is disabled by default. This turns it on.
--  WARNING: Once enabled, NO ONE can access the table until you add policies!
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- =============================================
--  STEP 3: Create RLS Policies
-- =============================================
--  These policies define WHO can do WHAT with the data
--  auth.uid() returns the logged-in user's ID from their JWT
-- Users can only read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR
SELECT USING (auth.uid() = id);
-- Users can only update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles FOR
UPDATE USING (auth.uid() = id);
-- Users can only insert their own profile (id must match their auth id)
CREATE POLICY "Users can insert own profile" ON public.profiles FOR
INSERT WITH CHECK (auth.uid() = id);
-- =============================================
--  FIXING MISTAKES: How to modify tables
-- =============================================
--  Made an error? Here's how to fix common issues:
--
--  Remove a column you don't need:
--  ALTER TABLE public.profiles DROP COLUMN column_name;
--
--  Add a column you forgot:
--  ALTER TABLE public.profiles ADD COLUMN bio text;
--
--  Rename a column:
--  ALTER TABLE public.profiles RENAME COLUMN old_name TO new_name;
--
--  Delete all rows (keeps table structure):
--  DELETE FROM public.profiles;
--
--  Drop entire table and start over:
--  DROP TABLE public.profiles;
-- =============================================
--  STEP 4: Create a PostgreSQL Function
-- =============================================
--  A function is a reusable block of SQL code that performs a specific task.
--  This function extracts user metadata and inserts it into the profiles table.
--
--  Key concepts:
--    - RETURNS trigger: This function is designed to be called by a trigger
--    - NEW: References the row that was just inserted (the new user)
--    - raw_user_meta_data: JSON object containing data passed during signup
--    - ->> operator: Extracts a value from JSON as text
--    - SECURITY DEFINER: Runs with elevated privileges (bypasses RLS)
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$ BEGIN
INSERT INTO public.profiles (id, first_name, last_name)
VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- =============================================
--  STEP 5: Create a PostgreSQL Trigger
-- =============================================
--  A trigger automatically executes a function in response to database events.
--  Think of it as an event listener for your database.
--
--  Key concepts:
--    - AFTER INSERT: The trigger fires after a new row is inserted
--    - ON auth.users: The trigger watches the auth.users table
--    - FOR EACH ROW: The function runs once for each inserted row
--    - EXECUTE FUNCTION: Specifies which function to call
--
--  Flow: User signs up -> Row inserted in auth.users -> Trigger fires -> Function executes -> Profile created
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- =============================================
--  STEP 6: Clear existing users (if any)
-- =============================================
--  The trigger only works for NEW signups. Existing users won't get profiles.
--  If you have test users from before, delete them:
--
--  Option 1: Delete profiles via SQL (users stay in auth.users)
--    DELETE FROM public.profiles;
--
--  Then sign up fresh to test the trigger.
-- =============================================
--  STEP 7: Disable email confirmation (for development)
-- =============================================
--  By default, Supabase requires email verification.
--  For development/testing, you can disable this:
--
--  1. Go to Supabase Dashboard
--  2. Authentication > Providers
--  3. Click on "Email"
--  4. Turn OFF "Confirm email"
--  5. Click "Save"
--
--  NOTE: Enable this again for production!
-- =============================================
--  STEP 8: Test it!
-- =============================================
--  1. Go to your app's signup page
--  2. Register a new user
--  3. Check the profiles table in Supabase - a row should be created automatically!
--
--  To verify in SQL Editor:
--  SELECT * FROM public.profiles;
-- =============================================
--  STEP 9: Verify in Table Editor
-- =============================================
--  1. Go to Supabase Dashboard
--  2. Click "Table Editor" in the sidebar
--  3. Select the "profiles" table
--  4. You should see your profile row, created automatically by the trigger and function
--
--  This demonstrates the power of PostgreSQL:
--    - The TRIGGER detected the signup event
--    - The FUNCTION executed the INSERT
--    - No frontend code needed - the database handled it
--
--  Congratulations! You're writing real SQL.
-- =============================================
--  STEP 10: Add Roles to Profiles Table
-- =============================================
--  Now we will add admin and user roles to our profiles table
-- Add role column for admin vs user distinction
ALTER TABLE public.profiles
ADD COLUMN role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));
--  1. Go to Supabase Dashboard
--  2. Click "Database"
--  3. On the profiles table you should see the role column
-- =============================================
--  STEP 11: Clear Profiles Table
-- =============================================
-- Delete all users if you had created any 
DELETE FROM auth.users;
-- Delete all profiles  if you had created any 
DELETE FROM public.profiles;
-- =============================================
--  STEP 12: Create Test Users
-- =============================================
--  Create 3 users to test RLS:
--    - 2 will be users
--    - 1 will be admin
--
--  Sign up these users through the app:
--
--  +-------+------------+-----------+----------------------+----------+
--  | Role  | First Name | Last Name | Email                | Password |
--  +-------+------------+-----------+----------------------+----------+
--  | Admin | Jim        | Hopper    | jim@hawkins.com      | password |
--  | User  | Eleven     | Hopper    | eleven@hawkins.com   | password |
--  | User  | Max        | Mayfield  | max@hawkins.com      | password |
--  +-------+------------+-----------+----------------------+----------+
-- =============================================
--  STEP 12: Check users 
-- =============================================
--  go to table editor
--   click on profiles to see the data in the table   
--  you will see the  3 users
--NOTICE they are all users not Admin
--    -



-- =============================================
--  STEP 13: Promote Hopper to Admin
-- =============================================
--  Right now all 3 users have role = 'user'
--  We need to make Jim Hopper an admin
--
--  Run this query in SQL Editor:
UPDATE public.profiles
SET role = 'admin'
WHERE first_name = 'jim';
--
--  NOTE: In production you'd use the user's ID instead of name,
--  but for this tutorial we use first_name since your IDs will differ.
--
--  Verify it worked:
--    1. Go to Table Editor > profiles
--    2. Hopper's role should now show 'admin'
--
--  Troubleshooting:
--    - Names are case-sensitive ('jim' != 'Jim')
--    - Check your profiles table for the exact first_name value

-- =============================================
--  SUMMARY: What You Learned
-- =============================================
--  1. CREATE TABLE    - Define database structure
--  2. FOREIGN KEY     - Create relationships between tables
--  3. RLS             - Row Level Security for data protection
--  4. POLICIES        - Define access rules (SELECT, INSERT, UPDATE, DELETE)
--  5. FUNCTIONS       - Reusable SQL code blocks
--  6. TRIGGERS        - Automatic responses to database events
--  7. auth.uid()      - Supabase helper to get current user's ID from JWT
--
--  These are core PostgreSQL concepts used in production applications.
-- =============================================
--  DONE! You've completed the RLS tutorial.
-- =============================================
--  Next steps to explore:
--    - Add admin-only policies (admins can see all profiles)
--    - Create a posts table with RLS
--    - Add a likes table with user-specific policies