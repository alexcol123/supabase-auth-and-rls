// =============================================================================
//  🎉 DASHBOARD-COMPLETED.TSX - BACKUP FILE
// =============================================================================
//
//  This is the COMPLETED version of Dashboard.tsx with all features working.
//
//  HOW TO USE:
//  If you messed up Dashboard.tsx, just copy this entire file's contents
//  and paste it into Dashboard.tsx to get back on track!
//
//  Or rename this file to Dashboard.tsx (and delete/rename the broken one).
//
// =============================================================================

import { useEffect, useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PixelCharacter from "./PixelArt";
import supabase from "../supabaseClient";

// =============================================================================
//  POST TYPE - Defines the shape of a post object
// =============================================================================
type Post = {
  id: string;
  title: string;
  content: string;
  is_public: boolean;
  author_id: string;
  profiles: { first_name: string } | null;
  likes: { user_id: string }[];
};

const Dashboard = () => {
  const { signOut, session } = UserAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  // Posts state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Create Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // =============================================================================
  //  STEP 22: fetchPosts - Fetch all posts from Supabase
  //  Referenced in: supabase/schema.sql Step 22
  // =============================================================================
  //  This function fetches posts that the current user is ALLOWED to see.
  //  RLS policies (Step 23 in schema.sql) control what data comes back:
  //    - Public posts: Everyone sees them
  //    - Private posts: Only author + admins see them
  // =============================================================================
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(first_name), likes(user_id)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }
    setLoadingPosts(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // =============================================================================
  //  STEP 25: handleDeletePost - Delete a post
  //  Referenced in: supabase/schema.sql Step 25
  // =============================================================================
  //  Calls: supabase.from("posts").delete().eq("id", postId)
  //
  //  RLS Policy enforces: auth.uid() = author_id OR is_admin()
  //  This means only the author OR an admin can delete a post.
  //  If someone else tries, Supabase returns an error!
  // =============================================================================
  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post: " + error.message);
    } else {
      fetchPosts(); // Refresh the list
    }
  };

  // =============================================================================
  //  STEP 25: canDelete - Check if current user can delete a post
  //  Referenced in: supabase/schema.sql Step 25
  // =============================================================================
  //  This is a FRONTEND check to decide whether to SHOW the delete button.
  //  The REAL security is in the RLS policy (database level).
  //
  //  Logic: "Is it my post OR am I an admin?"
  // =============================================================================
  const canDelete = (post: Post) => {
    return post.author_id === session?.id || session?.role === "admin";
  };

  // =============================================================================
  //  STEP 27: handleLike - Like or unlike a post
  //  Referenced in: supabase/schema.sql Step 27
  // =============================================================================
  //  If already liked -> DELETE the like (unlike)
  //  If not liked -> INSERT a new like
  //
  //  RLS Policy enforces: auth.uid() = user_id
  //  This prevents users from liking/unliking on behalf of others!
  //
  //  The UNIQUE(user_id, post_id) constraint prevents duplicate likes.
  // =============================================================================
  const handleLike = async (postId: string, isLiked: boolean) => {
    if (!session) return;

    if (isLiked) {
      // Unlike: Remove the like
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", session.id);

      if (error) {
        console.error("Error removing like:", error);
      } else {
        fetchPosts();
      }
    } else {
      // Like: Add a new like
      const { error } = await supabase.from("likes").insert({
        post_id: postId,
        user_id: session.id,
      });

      if (error) {
        console.error("Error adding like:", error);
      } else {
        fetchPosts();
      }
    }
  };

  // =============================================================================
  //  STEP 27: hasLiked - Check if current user has liked a post
  //  Referenced in: supabase/schema.sql Step 27
  // =============================================================================
  //  Returns true if the current user's ID is in the post's likes array.
  //  Used to toggle the heart icon (♥ vs ♡) and button style.
  // =============================================================================
  const hasLiked = (post: Post) => {
    return post.likes?.some((like) => like.user_id === session?.id) ?? false;
  };

  // =============================================================================
  //  STEP 28: handleCreatePost - Create a new post
  //  Referenced in: supabase/schema.sql Step 28
  // =============================================================================
  //  Calls: supabase.from("posts").insert({...})
  //
  //  RLS Policy enforces: auth.uid() = author_id
  //  This prevents users from creating posts as someone else!
  //
  //  The is_public field controls visibility via the SELECT policy.
  // =============================================================================
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !newTitle.trim()) return;

    setIsCreating(true);
    const { error } = await supabase.from("posts").insert({
      author_id: session.id,
      title: newTitle.trim(),
      content: newContent.trim(),
      is_public: isPublic,
    });

    if (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post: " + error.message);
    } else {
      setNewTitle("");
      setNewContent("");
      setIsPublic(true);
      fetchPosts(); // Refresh the list
    }
    setIsCreating(false);
  };

  // =============================================================================
  //  HELPER FUNCTIONS (Not part of tutorial)
  // =============================================================================
  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      navigate("/");
    } catch {
      console.error("Failed to sign out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getCharacter = () => {
    const name = session?.firstName?.toLowerCase() || "";
    if (name.includes("jim") || name.includes("hopper")) return "hopper";
    if (name.includes("eleven")) return "eleven";
    if (name.includes("max")) return "max";
    return "eleven";
  };

  // Guard for TypeScript (PrivateRoute guarantees session exists)
  if (!session) return null;

  // =============================================================================
  //  RENDER - UI Components
  // =============================================================================
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-red-500">Dashboard</span>
        </h1>
        <p className="text-gray-500">Welcome to the Upside Down</p>
      </div>

      {/* User Card */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 max-w-md mx-auto">
        {/* Character Avatar */}
        <div className="flex justify-center mb-6">
          <PixelCharacter character={getCharacter()} size="lg" showName={false} hoverable={false} />
        </div>

        {/* User Info */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">
            {session.firstName} {session.lastName}
          </h2>
          <p className="text-gray-400">{session.email}</p>

          {/* Role Badge */}
          <div className="pt-2">
            <span className="inline-block bg-red-600/20 text-red-400 text-xs px-3 py-1 rounded-full border border-red-600/30">
              {session.role}
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-8">
          <button
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 px-4 py-3 rounded-md transition-colors border border-gray-600"
          >
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/*  STEP 28: Create Post Form                                       */}
      {/*  Referenced in: supabase/schema.sql Step 28                      */}
      {/* ================================================================= */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleCreatePost} className="bg-gray-800 p-4 rounded-lg space-y-4">
          <div>
            <input
              type="text"
              placeholder="Post title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Post content (optional)"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              <span>Public post</span>
            </label>
            <span className="text-gray-400 text-sm">
              {isPublic ? "(Everyone can see)" : "(Only you and admins can see)"}
            </span>
          </div>
          <button
            type="submit"
            disabled={isCreating || !newTitle.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-md"
          >
            {isCreating ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>

      {/* ================================================================= */}
      {/*  STEP 22-24: Posts List                                          */}
      {/*  Shows posts based on RLS policies (Step 23)                     */}
      {/* ================================================================= */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Posts I Can See ({posts.length})
        </h2>
        {loadingPosts ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-400">No posts found</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => {
              const liked = hasLiked(post);
              const likeCount = post.likes?.length ?? 0;

              return (
                <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          post.is_public
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {post.is_public ? "PUBLIC" : "PRIVATE"}
                      </span>
                      <span className="text-gray-400 text-sm">
                        by {post.profiles?.first_name || "Unknown"}
                      </span>
                    </div>

                    {/* STEP 25: Delete Button - Only shown if canDelete() is true */}
                    {canDelete(post) && (
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-gray-300 text-sm">{post.content}</p>

                  {/* STEP 27: Like Button */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => handleLike(post.id, liked)}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm transition-colors ${
                        liked
                          ? "bg-pink-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      <span>{liked ? "♥" : "♡"}</span>
                      <span>{likeCount}</span>
                    </button>
                    {liked && (
                      <span className="text-xs text-gray-400">You liked this</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
