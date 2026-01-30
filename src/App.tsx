import { Link } from "react-router-dom";

// Pixel size for the 8-bit art
const px = 4;

// Color palette
const colors = {
  // Hopper
  hopperHair: "#5D4037",
  hopperSkin: "#D2A679",
  mustache: "#3E2723",
  // Eleven
  elevenHair: "#4A3728",
  elevenSkin: "#DEBB9B",
  // Max
  maxHair: "#D84315",
  maxSkin: "#E8C4A8",
  freckle: "#C9A066",
  // Shared
  eye: "#1a1a1a",
  mouth: "#C97878",
};

// Pixel art using box-shadow (each shadow = 1 pixel)
const pixelArt = {
  hopper: {
    width: px,
    height: px,
    backgroundColor: colors.hopperHair,
    boxShadow: `
      /* Row 0 - Hair */
      ${px}px 0 ${colors.hopperHair}, ${2*px}px 0 ${colors.hopperHair}, ${3*px}px 0 ${colors.hopperHair},
      ${4*px}px 0 ${colors.hopperHair}, ${5*px}px 0 ${colors.hopperHair}, ${6*px}px 0 ${colors.hopperHair},
      /* Row 1 - Hair */
      0 ${px}px ${colors.hopperHair}, ${px}px ${px}px ${colors.hopperHair}, ${2*px}px ${px}px ${colors.hopperHair},
      ${3*px}px ${px}px ${colors.hopperHair}, ${4*px}px ${px}px ${colors.hopperHair}, ${5*px}px ${px}px ${colors.hopperHair},
      ${6*px}px ${px}px ${colors.hopperHair}, ${7*px}px ${px}px ${colors.hopperHair},
      /* Row 2 - Forehead */
      0 ${2*px}px ${colors.hopperHair}, ${px}px ${2*px}px ${colors.hopperSkin}, ${2*px}px ${2*px}px ${colors.hopperSkin},
      ${3*px}px ${2*px}px ${colors.hopperSkin}, ${4*px}px ${2*px}px ${colors.hopperSkin}, ${5*px}px ${2*px}px ${colors.hopperSkin},
      ${6*px}px ${2*px}px ${colors.hopperSkin}, ${7*px}px ${2*px}px ${colors.hopperHair},
      /* Row 3 - Eyes */
      0 ${3*px}px ${colors.hopperSkin}, ${px}px ${3*px}px ${colors.hopperSkin}, ${2*px}px ${3*px}px ${colors.eye},
      ${3*px}px ${3*px}px ${colors.hopperSkin}, ${4*px}px ${3*px}px ${colors.hopperSkin}, ${5*px}px ${3*px}px ${colors.eye},
      ${6*px}px ${3*px}px ${colors.hopperSkin}, ${7*px}px ${3*px}px ${colors.hopperSkin},
      /* Row 4 - Nose */
      0 ${4*px}px ${colors.hopperSkin}, ${px}px ${4*px}px ${colors.hopperSkin}, ${2*px}px ${4*px}px ${colors.hopperSkin},
      ${3*px}px ${4*px}px ${colors.hopperSkin}, ${4*px}px ${4*px}px ${colors.hopperSkin}, ${5*px}px ${4*px}px ${colors.hopperSkin},
      ${6*px}px ${4*px}px ${colors.hopperSkin}, ${7*px}px ${4*px}px ${colors.hopperSkin},
      /* Row 5 - Mustache */
      0 ${5*px}px ${colors.hopperSkin}, ${px}px ${5*px}px ${colors.mustache}, ${2*px}px ${5*px}px ${colors.mustache},
      ${3*px}px ${5*px}px ${colors.mustache}, ${4*px}px ${5*px}px ${colors.mustache}, ${5*px}px ${5*px}px ${colors.mustache},
      ${6*px}px ${5*px}px ${colors.mustache}, ${7*px}px ${5*px}px ${colors.hopperSkin},
      /* Row 6 - Mouth */
      0 ${6*px}px ${colors.hopperSkin}, ${px}px ${6*px}px ${colors.hopperSkin}, ${2*px}px ${6*px}px ${colors.hopperSkin},
      ${3*px}px ${6*px}px ${colors.mouth}, ${4*px}px ${6*px}px ${colors.mouth}, ${5*px}px ${6*px}px ${colors.hopperSkin},
      ${6*px}px ${6*px}px ${colors.hopperSkin}, ${7*px}px ${6*px}px ${colors.hopperSkin},
      /* Row 7 - Chin */
      ${px}px ${7*px}px ${colors.hopperSkin}, ${2*px}px ${7*px}px ${colors.hopperSkin}, ${3*px}px ${7*px}px ${colors.hopperSkin},
      ${4*px}px ${7*px}px ${colors.hopperSkin}, ${5*px}px ${7*px}px ${colors.hopperSkin}, ${6*px}px ${7*px}px ${colors.hopperSkin}
    `,
  },
  eleven: {
    width: px,
    height: px,
    backgroundColor: colors.elevenHair,
    boxShadow: `
      /* Row 0 - Buzzed hair */
      ${px}px 0 ${colors.elevenHair}, ${2*px}px 0 ${colors.elevenHair}, ${3*px}px 0 ${colors.elevenHair},
      ${4*px}px 0 ${colors.elevenHair}, ${5*px}px 0 ${colors.elevenHair}, ${6*px}px 0 ${colors.elevenHair},
      /* Row 1 - Hair */
      0 ${px}px ${colors.elevenHair}, ${px}px ${px}px ${colors.elevenHair}, ${2*px}px ${px}px ${colors.elevenHair},
      ${3*px}px ${px}px ${colors.elevenHair}, ${4*px}px ${px}px ${colors.elevenHair}, ${5*px}px ${px}px ${colors.elevenHair},
      ${6*px}px ${px}px ${colors.elevenHair}, ${7*px}px ${px}px ${colors.elevenHair},
      /* Row 2 - Forehead */
      0 ${2*px}px ${colors.elevenHair}, ${px}px ${2*px}px ${colors.elevenSkin}, ${2*px}px ${2*px}px ${colors.elevenSkin},
      ${3*px}px ${2*px}px ${colors.elevenSkin}, ${4*px}px ${2*px}px ${colors.elevenSkin}, ${5*px}px ${2*px}px ${colors.elevenSkin},
      ${6*px}px ${2*px}px ${colors.elevenSkin}, ${7*px}px ${2*px}px ${colors.elevenHair},
      /* Row 3 - Big Eyes */
      0 ${3*px}px ${colors.elevenSkin}, ${px}px ${3*px}px ${colors.eye}, ${2*px}px ${3*px}px ${colors.eye},
      ${3*px}px ${3*px}px ${colors.elevenSkin}, ${4*px}px ${3*px}px ${colors.elevenSkin}, ${5*px}px ${3*px}px ${colors.eye},
      ${6*px}px ${3*px}px ${colors.eye}, ${7*px}px ${3*px}px ${colors.elevenSkin},
      /* Row 4 - Under eyes */
      0 ${4*px}px ${colors.elevenSkin}, ${px}px ${4*px}px ${colors.elevenSkin}, ${2*px}px ${4*px}px ${colors.elevenSkin},
      ${3*px}px ${4*px}px ${colors.elevenSkin}, ${4*px}px ${4*px}px ${colors.elevenSkin}, ${5*px}px ${4*px}px ${colors.elevenSkin},
      ${6*px}px ${4*px}px ${colors.elevenSkin}, ${7*px}px ${4*px}px ${colors.elevenSkin},
      /* Row 5 - Nose */
      0 ${5*px}px ${colors.elevenSkin}, ${px}px ${5*px}px ${colors.elevenSkin}, ${2*px}px ${5*px}px ${colors.elevenSkin},
      ${3*px}px ${5*px}px ${colors.elevenSkin}, ${4*px}px ${5*px}px ${colors.elevenSkin}, ${5*px}px ${5*px}px ${colors.elevenSkin},
      ${6*px}px ${5*px}px ${colors.elevenSkin}, ${7*px}px ${5*px}px ${colors.elevenSkin},
      /* Row 6 - Mouth */
      0 ${6*px}px ${colors.elevenSkin}, ${px}px ${6*px}px ${colors.elevenSkin}, ${2*px}px ${6*px}px ${colors.elevenSkin},
      ${3*px}px ${6*px}px ${colors.mouth}, ${4*px}px ${6*px}px ${colors.mouth}, ${5*px}px ${6*px}px ${colors.elevenSkin},
      ${6*px}px ${6*px}px ${colors.elevenSkin}, ${7*px}px ${6*px}px ${colors.elevenSkin},
      /* Row 7 - Chin */
      ${px}px ${7*px}px ${colors.elevenSkin}, ${2*px}px ${7*px}px ${colors.elevenSkin}, ${3*px}px ${7*px}px ${colors.elevenSkin},
      ${4*px}px ${7*px}px ${colors.elevenSkin}, ${5*px}px ${7*px}px ${colors.elevenSkin}, ${6*px}px ${7*px}px ${colors.elevenSkin}
    `,
  },
  max: {
    width: px,
    height: px,
    backgroundColor: colors.maxHair,
    boxShadow: `
      /* Row 0 - Flowing red hair */
      ${px}px 0 ${colors.maxHair}, ${6*px}px 0 ${colors.maxHair}, ${7*px}px 0 ${colors.maxHair},
      /* Row 1 - Hair */
      0 ${px}px ${colors.maxHair}, ${px}px ${px}px ${colors.maxHair}, ${2*px}px ${px}px ${colors.maxHair},
      ${3*px}px ${px}px ${colors.maxHair}, ${4*px}px ${px}px ${colors.maxHair}, ${5*px}px ${px}px ${colors.maxHair},
      ${6*px}px ${px}px ${colors.maxHair}, ${7*px}px ${px}px ${colors.maxHair},
      /* Row 2 - Forehead with hair sides */
      0 ${2*px}px ${colors.maxHair}, ${px}px ${2*px}px ${colors.maxSkin}, ${2*px}px ${2*px}px ${colors.maxSkin},
      ${3*px}px ${2*px}px ${colors.maxSkin}, ${4*px}px ${2*px}px ${colors.maxSkin}, ${5*px}px ${2*px}px ${colors.maxSkin},
      ${6*px}px ${2*px}px ${colors.maxSkin}, ${7*px}px ${2*px}px ${colors.maxHair},
      /* Row 3 - Eyes */
      0 ${3*px}px ${colors.maxHair}, ${px}px ${3*px}px ${colors.maxSkin}, ${2*px}px ${3*px}px ${colors.eye},
      ${3*px}px ${3*px}px ${colors.maxSkin}, ${4*px}px ${3*px}px ${colors.maxSkin}, ${5*px}px ${3*px}px ${colors.eye},
      ${6*px}px ${3*px}px ${colors.maxSkin}, ${7*px}px ${3*px}px ${colors.maxHair},
      /* Row 4 - Freckles */
      0 ${4*px}px ${colors.maxHair}, ${px}px ${4*px}px ${colors.freckle}, ${2*px}px ${4*px}px ${colors.maxSkin},
      ${3*px}px ${4*px}px ${colors.maxSkin}, ${4*px}px ${4*px}px ${colors.maxSkin}, ${5*px}px ${4*px}px ${colors.maxSkin},
      ${6*px}px ${4*px}px ${colors.freckle}, ${7*px}px ${4*px}px ${colors.maxHair},
      /* Row 5 - Nose */
      0 ${5*px}px ${colors.maxHair}, ${px}px ${5*px}px ${colors.maxSkin}, ${2*px}px ${5*px}px ${colors.maxSkin},
      ${3*px}px ${5*px}px ${colors.maxSkin}, ${4*px}px ${5*px}px ${colors.maxSkin}, ${5*px}px ${5*px}px ${colors.maxSkin},
      ${6*px}px ${5*px}px ${colors.maxSkin}, ${7*px}px ${5*px}px ${colors.maxHair},
      /* Row 6 - Mouth */
      0 ${6*px}px ${colors.maxHair}, ${px}px ${6*px}px ${colors.maxSkin}, ${2*px}px ${6*px}px ${colors.maxSkin},
      ${3*px}px ${6*px}px ${colors.mouth}, ${4*px}px ${6*px}px ${colors.mouth}, ${5*px}px ${6*px}px ${colors.maxSkin},
      ${6*px}px ${6*px}px ${colors.maxSkin}, ${7*px}px ${6*px}px ${colors.maxHair},
      /* Row 7 - Chin with hair */
      0 ${7*px}px ${colors.maxHair}, ${px}px ${7*px}px ${colors.maxSkin}, ${2*px}px ${7*px}px ${colors.maxSkin},
      ${3*px}px ${7*px}px ${colors.maxSkin}, ${4*px}px ${7*px}px ${colors.maxSkin}, ${5*px}px ${7*px}px ${colors.maxSkin},
      ${6*px}px ${7*px}px ${colors.maxSkin}, ${7*px}px ${7*px}px ${colors.maxHair}
    `,
  },
};

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

      {/* Test Users with Pixel Art */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-10 text-gray-300">
          Your Test Subjects
        </h2>
        <div className="flex justify-center gap-16">
          {/* Hopper */}
          <div className="flex flex-col items-center">
            <div className="mb-4 relative" style={{ width: 32, height: 32 }}>
              <div style={pixelArt.hopper} />
            </div>
            <p className="text-red-500 font-semibold">Hopper</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>

          {/* Eleven */}
          <div className="flex flex-col items-center">
            <div className="mb-4 relative" style={{ width: 32, height: 32 }}>
              <div style={pixelArt.eleven} />
            </div>
            <p className="text-white font-semibold">Eleven</p>
            <p className="text-xs text-gray-500">User</p>
          </div>

          {/* Max */}
          <div className="flex flex-col items-center">
            <div className="mb-4 relative" style={{ width: 32, height: 32 }}>
              <div style={pixelArt.max} />
            </div>
            <p className="text-white font-semibold">Max</p>
            <p className="text-xs text-gray-500">User</p>
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
