import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { PixelCharacterGroup } from "./PixelArt";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, session } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect when session becomes available
  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn(email, password);

      if (!result.success) {
        setError(result.error || "An unknown error occurred");
        setIsLoading(false);
      }
      // Don't navigate here - let the useEffect handle it when session updates
    } catch {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Pixel Art Characters */}
      <div className="mb-8">
        <p className="text-center text-gray-500 text-sm mb-4">
          Choose your character
        </p>
        <PixelCharacterGroup />
      </div>
      <form
        onSubmit={handleSignIn}
        className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-2 text-center">
          <span className="text-red-500">Sign In</span>
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter the Upside Down
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-3 rounded-md border border-red-500/20">
            {error}
          </p>
        )}

        <div className="flex flex-col space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 p-3 rounded-md font-medium transition-colors"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-red-400 hover:text-red-300 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </form>

      {/* Test Users */}
      <div className="mt-8 max-w-md w-full">
        <h3 className="text-gray-400 text-sm text-center mb-4">Test Users (click to fill)</h3>
        <div className="space-y-3">
          {[
            { role: "Admin", name: "Jim Hopper", email: "jim@hawkins.com", password: "password" },
            { role: "User", name: "Eleven Hopper", email: "eleven@hawkins.com", password: "password" },
            { role: "User", name: "Max Mayfield", email: "max@hawkins.com", password: "password" },
          ].map((user) => (
            <div
              key={user.email}
              className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-sm cursor-pointer hover:border-gray-600 transition-colors"
              onClick={() => {
                setEmail(user.email);
                setPassword(user.password);
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-medium">{user.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${user.role === "Admin" ? "bg-red-600/20 text-red-400" : "bg-gray-600/20 text-gray-400"}`}>
                  {user.role}
                </span>
              </div>
              <p className="text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
