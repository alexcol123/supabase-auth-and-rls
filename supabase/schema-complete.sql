-- =============================================================================
--  SCHEMA-COMPLETE.SQL - Run Everything at Once
-- =============================================================================
--
--  This file runs ALL the SQL from the tutorial in one go.
--  Use this to quickly set up the database or reset after mistakes.
--
--  BEFORE RUNNING:
--    1. Make sure you have a fresh Supabase project (or drop existing tables)
--    2. After running this, create your test users via the app's signup page
--    3. Then run the SEED DATA section with your actual UUIDs
--
--  ORDER OF OPERATIONS:
--    1. Tables (profiles, posts, likes)
--    2. Functions & Triggers
--    3. Enable RLS
--    4. Policies
--    5. Seed Data (manual step - needs real UUIDs)
--
-- =============================================================================


-- =============================================================================
--  STEP 1: DROP EXISTING (if resetting)
-- =============================================================================
-- Uncomment these lines if you need to reset everything:
--
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP TRIGGER IF EXISTS protect_role_changes ON public.profiles;
-- DROP FUNCTION IF EXISTS public.handle_new_user();
-- DROP FUNCTION IF EXISTS public.handle_role_protection();
-- DROP FUNCTION IF EXISTS public.is_admin();
-- DROP TABLE IF EXISTS public.likes;
-- DROP TABLE IF EXISTS public.posts;
-- DROP TABLE IF EXISTS public.profiles;


-- =============================================================================
--  STEP 2: Create Tables
-- =============================================================================

-- Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

-- Posts table
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_author ON public.posts(author_id);
CREATE INDEX idx_posts_public ON public.posts(is_public);

-- Likes table (junction table for many-to-many)
CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

CREATE INDEX idx_likes_post ON public.likes(post_id);
CREATE INDEX idx_likes_user ON public.likes(user_id);


-- =============================================================================
--  STEP 3: Create Functions
-- =============================================================================

-- Function: Auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Protect role from user changes
CREATE OR REPLACE FUNCTION public.handle_role_protection()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    NEW.role := OLD.role;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;


-- =============================================================================
--  STEP 4: Create Triggers
-- =============================================================================

-- Trigger: Auto-create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Protect role changes
CREATE TRIGGER protect_role_changes
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_role_protection();


-- =============================================================================
--  STEP 5: Enable Row Level Security
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;


-- =============================================================================
--  STEP 6: Create Policies - Profiles
-- =============================================================================

-- Everyone can view profiles (needed to show author names)
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Users can only read their own profile details
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);


-- =============================================================================
--  STEP 7: Create Policies - Posts
-- =============================================================================

-- SELECT: Public posts visible to all, private posts to author/admin only
CREATE POLICY "Users can view public posts or own posts"
  ON public.posts FOR SELECT
  USING (
    is_public = true
    OR auth.uid() = author_id
    OR is_admin()
  );

-- INSERT: Users can only create posts as themselves
CREATE POLICY "Authenticated users can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- UPDATE: Only author can update
CREATE POLICY "Authors can update own posts"
  ON public.posts FOR UPDATE
  USING (auth.uid() = author_id);

-- DELETE: Author or admin can delete
CREATE POLICY "Authors and admins can delete posts"
  ON public.posts FOR DELETE
  USING (auth.uid() = author_id OR is_admin());


-- =============================================================================
--  STEP 8: Create Policies - Likes
-- =============================================================================

-- Everyone can see likes
CREATE POLICY "Likes are viewable by everyone"
  ON public.likes FOR SELECT
  USING (true);

-- Users can only like as themselves
CREATE POLICY "Users can like posts"
  ON public.likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only remove their own likes
CREATE POLICY "Users can remove own likes"
  ON public.likes FOR DELETE
  USING (auth.uid() = user_id);


-- =============================================================================
--  ✅ DONE! Now do these manual steps:
-- =============================================================================
--
--  1. DISABLE EMAIL CONFIRMATION (for development):
--     Supabase Dashboard > Authentication > Providers > Email > Turn OFF "Confirm email"
--
--  2. CREATE TEST USERS via your app's signup page:
--     +-------+------------+-----------+----------------------+----------+
--     | Role  | First Name | Last Name | Email                | Password |
--     +-------+------------+-----------+----------------------+----------+
--     | Admin | Jim        | Hopper    | jim@hawkins.com      | password |
--     | User  | Eleven     | Hopper    | eleven@hawkins.com   | password |
--     | User  | Max        | Mayfield  | max@hawkins.com      | password |
--     +-------+------------+-----------+----------------------+----------+
--
--  3. PROMOTE JIM TO ADMIN:
--     UPDATE public.profiles SET role = 'admin' WHERE first_name = 'Jim';
--
--  4. GET YOUR UUIDs:
--     SELECT id, first_name, last_name FROM public.profiles;
--
--  5. SEED POSTS (replace UUIDs below with your actual IDs):


-- =============================================================================
--  SEED DATA - Replace UUIDs with your actual profile IDs!
-- =============================================================================

-- INSERT INTO public.posts (author_id, title, content, is_public) VALUES
--   -- Jim Hopper (Admin)
--   ('REPLACE_WITH_JIM_UUID', 'Hawkins PD Update', 'All quiet in Hawkins. No strange activity to report... for now.', true),
--   ('REPLACE_WITH_JIM_UUID', 'Classified: Lab Incident', 'Contact at the lab mentioned unusual readings. Keep this quiet.', false),
--   -- Eleven (User)
--   ('REPLACE_WITH_ELEVEN_UUID', 'Friends dont lie', 'Learned this from Mike. Its important.', true),
--   ('REPLACE_WITH_ELEVEN_UUID', 'The Upside Down', 'I still see it sometimes when I close my eyes.', false),
--   -- Max (User)
--   ('REPLACE_WITH_MAX_UUID', 'New High Score!', 'Just beat the Dig Dug record at Palace Arcade. Come at me.', true),
--   ('REPLACE_WITH_MAX_UUID', 'I miss California', 'Hawkins is weird. Something feels off about this place.', false);
