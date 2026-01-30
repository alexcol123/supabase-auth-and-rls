import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PixelCharacter from "./PixelArt";

const Dashboard = () => {
  // PrivateRoute handles loading/auth - session is guaranteed here
  const { signOut, session } = UserAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();



  // Create Post Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isCreating, setIsCreating] = useState(false);


  // 
  const handleCreatePost =()=>{
    console.log('posted')
  }

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

          {/* Role Badge - you can add role to your AuthContext later */}
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


      {/* Create Post Form */}
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
    </section>
  );
};

export default Dashboard;
