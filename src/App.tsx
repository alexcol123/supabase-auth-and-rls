import { Link } from "react-router-dom";


const App = () => {


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Master SQL & RLS with{" "}
          <span className="text-green-500">Supabase</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Practice creating tables, writing queries, and implementing Row Level
          Security policies. Learn by doing with real Supabase databases.
        </p>


          <Link
            to="/dashboard"
            className="inline-block bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
          >
            Go to Dashboard
          </Link>



          <div className="flex gap-4 justify-center mt-8">
            <Link
              to="/sign-up"
              className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/sign-in"
              className="bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What You'll Learn</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Create Tables</h3>
            <p className="text-gray-400">
              Design database schemas, define relationships, and understand data types in PostgreSQL.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Row Level Security</h3>
            <p className="text-gray-400">
              Master RLS policies to secure your data. Control who can read, insert, update, and delete.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Supabase Integration</h3>
            <p className="text-gray-400">
              Learn how to use Supabase Auth, Realtime, and Storage with your SQL knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Topics Covered</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "CREATE TABLE statements",
            "Primary & Foreign Keys",
            "RLS Policies (SELECT, INSERT, UPDATE, DELETE)",
            "auth.uid() and auth.jwt()",
            "Database Triggers",
            "Functions & Stored Procedures",
            "Indexes & Performance",
            "Joins & Relationships",
          ].map((topic) => (
            <div
              key={topic}
              className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg"
            >
              <span className="text-green-500">✓</span>
              <span>{topic}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500">
        <p>Built with Supabase & React</p>
      </footer>
    </div>
  );
};

export default App;