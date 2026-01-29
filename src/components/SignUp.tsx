import { useState } from "react";
import { UserAuth } from "../Context/AuthContext";

const Signup = () => {
  const { signUpNewUser } = UserAuth();

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // email: string,
  // password: string,
  // firstName: string,
  // lastName: string,

  return (
    <section className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Sign
        <span className="text-green-500"> Up</span>
      </h1>

      <h2 className="text-2xl">{firstName}</h2>
      <h2 className="text-2xl">{lastName}</h2>

      <div className="min-h-screen flex items-center justify-center border bg-gray-900">
        <form onSubmit={signUpNewUser} className="max-w-md w-full mx-auto">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  );
};
export default Signup;
