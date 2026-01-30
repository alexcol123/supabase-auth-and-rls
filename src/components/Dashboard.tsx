import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import PixelCharacter from "./PixelArt";

const Dashboard = () => {
  const { signOut, session } = UserAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

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

  // Determine which character to show based on user's first name
  const getCharacter = () => {
    const name = session?.firstName?.toLowerCase();
    if (name === "jim" || name === "hopper") return "hopper";
    if (name === "eleven" || name === "el" || name === "jane") return "eleven";
    if (name === "max" || name === "maxine") return "max";
    // Default based on role or random
    return "eleven";
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

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
              User
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

      {/* Quick Info */}
      <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
        <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
          <p className="text-2xl font-bold text-red-500">0</p>
          <p className="text-xs text-gray-500">Posts</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
          <p className="text-2xl font-bold text-red-500">0</p>
          <p className="text-xs text-gray-500">Likes</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700">
          <p className="text-2xl font-bold text-red-500">1</p>
          <p className="text-xs text-gray-500">Friends</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
