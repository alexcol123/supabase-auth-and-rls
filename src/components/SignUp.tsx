import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const SignUp = () => {
  // const navigate = useNavigate();

  const { signUpNewUser } = UserAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("Munoz");
  const [email, setEmail] = useState("alex@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const resp = await signUpNewUser(email, password, firstName, lastName);
      console.log(resp);
    } catch {
      console.log("Error login in, client");
    }
  };

  // try {
  //   const result = await signUpNewUser(email, password, firstName, lastName);

  //   if (!result.success) {
  //     setError(result.error || "An unknown error occurred");
  //   }
  //   if (result.success) {
  //     navigate("/dashboard");
  //   }
  // } catch {
  //   setError("An unexpected error occurred");
  // } finally {
  //   setIsLoading(false);
  // }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="max-w-md w-full mx-auto bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-semibold mb-6">Sign up today</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex flex-col space-y-4">
          <div className="flex gap-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
              type="text"
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 p-3 rounded-md font-medium transition-colors"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
