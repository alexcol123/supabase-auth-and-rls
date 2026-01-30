import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">
          <span className="text-red-600">STRANGER</span>
          <span className="text-red-500"> RLS</span>
        </Link>

        <div className="flex gap-4 items-center">
          {session ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-gray-500 text-sm">
                {session.firstName}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
