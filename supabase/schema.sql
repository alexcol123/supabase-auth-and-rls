-- =============================================
--  SUPABASE RLS TUTORIAL
--  Run each section one at a time in SQL Editor
-- =============================================
--
-- +-----------------------------------------------------------------------+
-- |  💡 WANT TO SKIP THE TUTORIAL?                                        |
-- |                                                                       |
-- |  Run supabase/schema-complete.sql instead!                            |
-- |  It executes everything in one go.                                    |
-- |                                                                       |
-- |  (You'll still need to create users and seed data manually)           |
-- +-----------------------------------------------------------------------+
--
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
--    - 2 will be regular users
--    - 1 will be promoted to admin
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
--  STEP 13: Check Users in Table Editor
-- =============================================
--  1. Go to Supabase Dashboard
--  2. Click "Table Editor" in the sidebar
--  3. Select the "profiles" table
--  4. You should see all 3 users
--
--  NOTICE: All users have role = 'user' (not admin yet!)

-- =============================================
--  STEP 14: Promote Hopper to Admin
-- =============================================
--  Right now all 3 users have role = 'user'
--  We need to make Jim Hopper an admin
--
--  Run this query in SQL Editor:
UPDATE public.profiles
SET role = 'admin'
WHERE first_name = 'Jim';
--
--  NOTE: In production you'd use the user's ID instead of name,
--  but for this tutorial we use first_name since your IDs will differ.
--
--  Verify it worked:
--    1. Go to Table Editor > profiles
--    2. Hopper's role should now show 'admin'
--
--  Troubleshooting:
--    - Names are case-sensitive ('Jim' != 'jim')
--    - Check your profiles table for the exact first_name value

-- =============================================
--  STEP 15: Protect Role from User Changes
-- =============================================
--  Problem: Users could potentially change their own role to 'admin'!
--  Solution: Create a trigger that prevents role changes
--
--  This function silently reverts any role changes:
CREATE OR REPLACE FUNCTION handle_role_protection()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Revert the role change silently
    NEW.role := OLD.role;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--  Now try to change Max to admin (this should fail silently):
--  UPDATE public.profiles
--  SET role = 'admin'
--  WHERE first_name = 'Max';
--
--  Check the profiles table - Max should still be 'user'!





-- =============================================
--  STEP 16: Create Posts table
-- =============================================

-- This table stores all user posts. Each post belongs to ONE author (a profile).

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

-- KEY CONCEPTS:
--
--   gen_random_uuid()    Generates a unique ID automatically (no need to provide one)
--   REFERENCES           Creates a foreign key relationship (author_id -> profiles.id)
--   ON DELETE CASCADE    If a profile is deleted, all their posts are deleted too
--   DEFAULT true         Posts are public by default unless set otherwise
--
-- WHY INDEXES?
--   idx_posts_author     Makes queries like "get all posts by user X" fast
--   idx_posts_public     Makes filtering public vs private posts fast
--
-- VERIFY: Go to Database > Schema Visualizer to see the posts table


-- =============================================
--  STEP 17: Create Likes table
-- =============================================

-- This is a "junction table" (also called a "join table").
-- It connects TWO tables: profiles and posts (many-to-many relationship).
-- One user can like MANY posts. One post can have MANY likes.

CREATE TABLE public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, post_id)  -- Prevents duplicate likes (one like per user per post)
);

CREATE INDEX idx_likes_post ON public.likes(post_id);
CREATE INDEX idx_likes_user ON public.likes(user_id);

-- KEY CONCEPTS:
--
--   UNIQUE(user_id, post_id)   A "composite unique constraint" - the COMBINATION must be unique
--                              User 1 can like Post A, User 1 can like Post B, but
--                              User 1 CANNOT like Post A twice!
--
-- VERIFY: Go to Database > Schema Visualizer to see how likes connects profiles and posts

-- =============================================
--  STEP 18: Enable RLS on Posts and Likes
-- =============================================

-- IMPORTANT: Enabling RLS locks down the table completely!
-- After this, NO ONE can read/write data until we create policies (rules).
-- Think of it like putting a lock on a door - now we need to hand out keys.

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- If you query these tables now in Supabase, you'll get ZERO rows back.
-- That's expected! RLS is enabled but we haven't defined WHO can access WHAT yet.



-- =============================================
--  STEP 19: Create helper function to check if user is admin
-- =============================================

-- WHY A FUNCTION?
-- We'll check "is this user an admin?" in multiple policies.
-- Instead of copy-pasting the same SQL everywhere, we create a reusable function.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- KEY CONCEPTS:
--
--   auth.uid()           Supabase magic! Returns the logged-in user's ID from their JWT token
--   SELECT EXISTS(...)   Returns TRUE if the inner query finds at least one row
--   SELECT 1             We don't need actual data, just checking if a row exists (faster)
--   SECURITY DEFINER     This function runs with elevated privileges, bypassing RLS
--                        Without this, the function couldn't read the profiles table!
--
-- HOW IT WORKS:
--   1. Get the current user's ID with auth.uid()
--   2. Look for a row in profiles where id matches AND role = 'admin'
--   3. Return TRUE if found, FALSE if not


-- =============================================
--  STEP 20: Allow everyone to view all profiles
-- =============================================

-- Our first policy! Let's break down the syntax:

CREATE POLICY "Profiles are viewable by everyone"  -- Name (shows up in Supabase dashboard)
  ON public.profiles                               -- Which table this policy applies to
  FOR SELECT                                       -- What operation (SELECT = reading data)
  USING (true);                                    -- The condition (true = always allowed)

-- WHY ALLOW THIS?
-- When showing a post, we want to display the author's name.
-- To do that, we need to read from the profiles table.
-- In social apps, profile info (name, avatar) is typically public.
--
-- USING (true) means "this policy always passes" - everyone can SELECT all profiles.



-- =============================================
--  QUICK REFERENCE: USING vs WITH CHECK
-- =============================================
--
--   USING        -> SELECT, UPDATE, DELETE (checks EXISTING rows)
--   WITH CHECK   -> INSERT, UPDATE (validates NEW data)
--
-- ANALOGY:
--   USING       = Bouncer checking your ID at the door
--   WITH CHECK  = Security checking what you're bringing IN


-- =============================================
--  STEP 21: Seed Posts (Stranger Things Edition)
-- =============================================

-- IMPORTANT: Get your actual UUIDs first! Run this in SQL Editor:
--
--   SELECT id, first_name, last_name FROM public.profiles;
--
-- Then replace the placeholder IDs below with your actual profile IDs.

INSERT INTO public.posts (author_id, title, content, is_public) VALUES
  -- Jim Hopper (Admin) - 2 posts
  ('ADD YOUR OWN ID FOR Hopper', 'Hawkins PD Update', 'All quiet in Hawkins. No strange activity to report... for now.', true),
  ('ADD YOUR OWN ID FOR Hopper', 'Classified: Lab Incident', 'Contact at the lab mentioned unusual readings. Keep this quiet.', false),

  -- Eleven (User) - 2 posts
  ('ADD YOUR OWN ID FOR Eleven', 'Friends dont lie', 'Learned this from Mike. Its important.', true),
  ('ADD YOUR OWN ID FOR Eleven', 'The Upside Down', 'I still see it sometimes when I close my eyes.', false),

  -- Max (User) - 2 posts
  ('ADD YOUR OWN ID FOR Max', 'New High Score!', 'Just beat the Dig Dug record at Palace Arcade. Come at me.', true),
  ('ADD YOUR OWN ID FOR Max', 'I miss California', 'Hawkins is weird. Something feels off about this place.', false);

-- VERIFY: Go to Database > posts table to see your seeded posts.
-- This technique can seed thousands of posts automatically in production!


-- =============================================
--  STEP 22: Try to View Posts on Your Website
-- =============================================

-- ⚠️  HEADS UP: You will see ZERO posts after this step!
-- That's expected - don't panic! Step 23 fixes it.

-- +-----------------------------------------------------------------------+
-- |  💡 MESSED UP? NO WORRIES!                                            |
-- |                                                                       |
-- |  If your Dashboard.tsx is broken, there's a backup file:              |
-- |  src/components/Dashboard-completed.tsx                               |
-- |                                                                       |
-- |  Just copy the contents into Dashboard.tsx and you're back on track! |
-- +-----------------------------------------------------------------------+

-- Go to Dashboard.tsx and look for the fetchPosts function.
-- This function calls: supabase.from("posts").select("*")
--
-- See src/components/Dashboard.tsx for the full implementation.

-- DO YOU SEE ANY POSTS? NO!
--
-- WHY? Remember Step 18? We enabled RLS:
--   ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
--
-- RLS locks everything down. We have NO policies yet, so NO data is visible.
-- Think of it like this: the door is locked, but we haven't given anyone a key!
--
-- Don't worry - Step 23 creates the policies (the keys) to fix this!



-- =============================================
--  STEP 23: Posts Policies (The Keys to the Lock!)
-- =============================================

-- Now let's define WHO can do WHAT with posts.
-- We need 4 policies: SELECT, INSERT, UPDATE, DELETE

-- SELECT: Who can VIEW posts?
CREATE POLICY "Users can view public posts or own posts"
  ON public.posts FOR SELECT
  USING (
    is_public = true                -- Anyone can see public posts
    OR auth.uid() = author_id       -- Authors can see their own private posts
    OR is_admin()                   -- Admins can see all posts
  );

-- INSERT: Users can only create posts as themselves
CREATE POLICY "Authenticated users can create posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

-- UPDATE: Only the original author can edit their post
CREATE POLICY "Authors can update own posts"
  ON public.posts FOR UPDATE
  USING (auth.uid() = author_id);

-- DELETE: Author OR admin can delete
CREATE POLICY "Authors and admins can delete posts"
  ON public.posts FOR DELETE
  USING (auth.uid() = author_id OR is_admin());

-- KEY CONCEPTS:
--   USING       = Checks EXISTING rows ("Can you access this?")
--   WITH CHECK  = Validates NEW data ("Can you write this?")
--   is_admin()  = Reusable function we created in Step 19




-- =============================================
--  STEP 24: Test Your Policies - View Posts
-- =============================================

-- Go back to your Dashboard page. You should NOW see posts!
--
-- TEST IT:
--   - Login as Jim (admin)    -> See ALL posts (public + private)
--   - Login as Eleven (user)  -> See public posts + only HER private posts
--   - Login as Max (user)     -> See public posts + only HER private posts


-- =============================================
--  STEP 25: Test Delete Functionality
-- =============================================

-- First, seed some test posts for deletion (replace IDs with yours):

INSERT INTO public.posts (author_id, title, content, is_public) VALUES
  -- Jim Hopper (Admin)
  ('ADD YOUR OWN ID FOR Hopper', 'DELETE TEST - Public from Jim', 'This is a PUBLIC post from Jim. Try to delete it!', true),
  ('ADD YOUR OWN ID FOR Hopper', 'DELETE TEST - Private from Jim', 'This is a PRIVATE post from Jim. Try to delete it!', false),

  -- Eleven (User)
  ('ADD YOUR OWN ID FOR Eleven', 'DELETE TEST - Public from Eleven', 'This is a PUBLIC post from Eleven. Try to delete it!', true),
  ('ADD YOUR OWN ID FOR Eleven', 'DELETE TEST - Private from Eleven', 'This is a PRIVATE post from Eleven. Try to delete it!', false),

  -- Max (User)
  ('ADD YOUR OWN ID FOR Max', 'DELETE TEST - Public from Max', 'This is a PUBLIC post from Max. Try to delete it!', true),
  ('ADD YOUR OWN ID FOR Max', 'DELETE TEST - Private from Max', 'This is a PRIVATE post from Max. Try to delete it!', false);

-- In Dashboard.tsx, uncomment the delete button code to enable deletion.

-- EXPECTED BEHAVIOR:
--   - Jim (admin)  -> Can delete ANY post
--   - Eleven       -> Can only delete HER posts
--   - Max          -> Can only delete HER posts

-- =============================================
--  CODE REFERENCE: Delete Functions
-- =============================================
--
-- See src/components/Dashboard.tsx for the full implementation:
--
--   canDelete(post)        -> Checks if current user can delete a post
--                             Logic: "Is it my post OR am I admin?"
--
--   handleDeletePost(id)   -> Calls supabase.from("posts").delete()
--                             Deletes the post and refreshes the list
--
-- The RLS policy we created (Step 23) enforces this on the DATABASE level.
-- The canDelete function just controls whether to SHOW the delete button.


-- =============================================
--  STEP 26: Likes Policies
-- =============================================

-- Similar to posts, but simpler. Everyone can see likes, but you can only
-- add/remove your OWN likes.

-- SELECT: Anyone can see all likes (for showing like counts)
CREATE POLICY "Likes are viewable by everyone"
  ON public.likes FOR SELECT
  USING (true);

-- INSERT: Users can only like as themselves (no fake likes!)
CREATE POLICY "Users can like posts"
  ON public.likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only remove their own likes
CREATE POLICY "Users can remove own likes"
  ON public.likes FOR DELETE
  USING (auth.uid() = user_id);


-- =============================================
--  STEP 27: Enable Like Button in Dashboard
-- =============================================

-- In src/components/Dashboard.tsx:
--   1. Uncomment the like button JSX code
--   2. Uncomment: const liked = hasLiked(post);
--
-- See the handleLike and hasLiked functions for implementation details.

-- TEST IT:
--   - Like a post   -> Heart fills in (♥), count goes up
--   - Unlike it     -> Heart empties (♡), count goes down
--   - Like twice    -> Should fail (UNIQUE constraint in likes table)



-- =============================================
--  STEP 28: Create Post Functionality
-- =============================================

-- See src/components/Dashboard.tsx for the handleCreatePost function.
--
-- HOW IT WORKS:
--   1. User fills out the form (title, content, public/private toggle)
--   2. Function calls: supabase.from("posts").insert({...})
--   3. RLS policy checks: Does author_id match auth.uid()? (Step 23)
--   4. If yes -> Post created! If no -> Error (can't impersonate others)
--
-- KEY FIELD:
--   is_public: true/false -> Controls who can see the post via RLS


-- =============================================
--  STEP 29: Test Create Post
-- =============================================

-- TEST IT:
--   1. Sign in as Eleven
--   2. Create a PRIVATE post
--   3. Sign in as Max -> She should NOT see Eleven's private post
--   4. Sign in as Jim (admin) -> He CAN see Eleven's private post
--
-- This proves your RLS policies are working!


-- =============================================
--  CONGRATULATIONS! You made it!
-- =============================================

-- You've learned:
--   [x] Creating tables with relationships (foreign keys)
--   [x] Enabling Row Level Security (RLS)
--   [x] Writing policies for SELECT, INSERT, UPDATE, DELETE
--   [x] Using auth.uid() to check the current user
--   [x] Creating helper functions (is_admin)
--   [x] Using SECURITY DEFINER to bypass RLS in functions
--   [x] Junction tables for many-to-many relationships (likes)
--   [x] Seeding data with INSERT statements
--
-- Your database is now SECURE! Users can only access what they're allowed to.
--
-- Thanks for following along!
-- Subscribe for more Upside Down tutorials!


-- =============================================
--  TODO: Future Features
-- =============================================
--
-- Ideas to extend this tutorial:
--   [ ] Add "Edit Post" functionality
--   [ ] Display who liked a post
--   [ ] Add comments table with RLS
--   [ ] Add user avatars
--   [ ] Add pagination for posts
