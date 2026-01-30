import { Link } from "react-router-dom";
import { PixelCharacterGroup } from "./components/PixelArt";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        {/* Logo/Title - Stranger Things style */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-wider">
          <span className="text-red-600">STRANGER</span>
          <br />
          <span className="text-red-500">RLS</span>
        </h1>

        <p className="text-xl text-gray-400 mb-2 font-light tracking-wide">
          The Upside Down of Database Security
        </p>

        <p className="text-3xl text-white mb-8 font-semibold">
          Learn Row Level Security in <span className="text-red-500">10 minutes</span>
        </p>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          No Demogorgons here. Just PostgreSQL, Supabase, and policies that
          actually make sense.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/sign-up"
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
          >
            Enter the Upside Down
          </Link>
          <Link
            to="/sign-in"
            className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Test Users with Pixel Art */}
        <div className="mt-16">
          <p className="text-sm text-gray-500 mb-6">Your test subjects</p>
          <PixelCharacterGroup />
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-300">
          What You'll Learn
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-700 p-6 rounded-lg">
            <h3 className="text-red-500 font-semibold mb-2">CREATE TABLE</h3>
            <p className="text-gray-400 text-sm">
              Build your database schema with profiles, posts, and likes
            </p>
          </div>

          <div className="border border-gray-700 p-6 rounded-lg">
            <h3 className="text-red-500 font-semibold mb-2">RLS Policies</h3>
            <p className="text-gray-400 text-sm">
              SELECT, INSERT, UPDATE, DELETE - control who sees what
            </p>
          </div>

          <div className="border border-gray-700 p-6 rounded-lg">
            <h3 className="text-red-500 font-semibold mb-2">Triggers & Functions</h3>
            <p className="text-gray-400 text-sm">
              Auto-create profiles when users sign up
            </p>
          </div>

          <div className="border border-gray-700 p-6 rounded-lg">
            <h3 className="text-red-500 font-semibold mb-2">Admin vs User Roles</h3>
            <p className="text-gray-400 text-sm">
              Give admins superpowers with EXISTS subqueries
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>Built with Supabase + React</p>
      </footer>
    </div>
  );
};

export default App;
