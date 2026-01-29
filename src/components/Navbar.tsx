import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Rls
        </Link>

        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Dashboard
          </Link>

          <>
            <Link
              to="/sign-in"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
            >
              Sign Up
            </Link>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
