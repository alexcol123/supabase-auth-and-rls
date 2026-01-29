-- ============================================
-- SUPABASE RLS TUTORIAL
-- Run each section one at a time in SQL Editor
-- ============================================


-- ============================================
-- STEP 0: Setup Supabase Project
-- ============================================
-- 1. Create a Supabase account at https://supabase.com
-- 2. Create a new project
-- 3. Go to: Project Overview (home icon) > scroll down
-- 4. Copy "Project URL" and "Publishable API Key"
--
--    They look like this:
--    VITE_SUPABASE_URL=https://qbxiiwmi....
--    VITE_SUPABASE_ANON_KEY=sb_publishable_uJP8eiqY4.......
--
-- 5. Create a .env file in the project root (copy from .env.example)


-- ============================================
-- STEP 1: Create profiles table
-- ============================================
-- This table stores user profile data linked to auth.users
-- The foreign key ensures when a user is deleted, their profile is too

CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name text,
  last_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);


-- ============================================
-- STEP 2: Enable Row Level Security
-- ============================================
-- RLS is disabled by default. This turns it on.
-- WARNING: Once enabled, NO ONE can access the table until you add policies!

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;


-- ============================================
-- STEP 3: Create RLS Policies
-- ============================================
-- These policies define WHO can do WHAT with the data
-- auth.uid() returns the logged-in user's ID from their JWT

-- Users can only read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can only insert their own profile (id must match their auth id)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);


-- ============================================
-- FIXING MISTAKES: How to modify tables
-- ============================================
-- Made an error? Here's how to fix common issues:

-- Remove a column you don't need:
-- ALTER TABLE public.profiles DROP COLUMN column_name;

-- Add a column you forgot:
-- ALTER TABLE public.profiles ADD COLUMN bio text;

-- Rename a column:
-- ALTER TABLE public.profiles RENAME COLUMN old_name TO new_name;

-- Delete all rows (keeps table structure):
-- DELETE FROM public.profiles;

-- Drop entire table and start over:
-- DROP TABLE public.profiles;


-- ============================================
-- STEP 4: Auto-create profile on signup
-- ============================================
-- This function runs automatically when someone signs up
-- It copies the user's metadata (first_name, last_name) to the profiles table

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================
-- STEP 5: Create the trigger
-- ============================================
-- This connects the function to the auth.users table
-- "AFTER INSERT" means it fires after a new user signs up

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================
-- STEP 6: Disable email confirmation (for development)
-- ============================================
-- By default, Supabase requires email verification.
-- For development/testing, you can disable this:
--
-- 1. Go to Supabase Dashboard
-- 2. Authentication > Providers
-- 3. Click on "Email"
-- 4. Turn OFF "Confirm email"
-- 5. Click "Save"
--
-- NOTE: Enable this again for production!


-- ============================================
-- STEP 7: Test it!
-- ============================================
-- 1. Go to your app's signup page
-- 2. Register a new user
-- 3. Check the profiles table in Supabase - a row should be created automatically!
--
-- To verify in SQL Editor:
-- SELECT * FROM public.profiles;


-- ============================================
-- DONE!
-- ============================================
