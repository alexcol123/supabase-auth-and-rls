import {
  createContext,
  useState,
  useContext,
  useEffect,
  Children,
} from "react";
import supabase from "../supabaseClient";

// interface User {
//   id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   role: "user" | "admin";
// }

const AuthContext = createContext(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState(null);
  const [loading, setloading] = useState(false);

  //https://supabase.com/docs/reference/javascript/auth-signup

  const signUpNewUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return { success: false, error: error.message };
    }
    console.log("--------------------------------");
    console.log(data);

    return { success: true, data };
  };

  return (
    <AuthContext.Provider value={{ signUpNewUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. The hook
export const UserAuth = () => {
  const context = useContext(AuthContext);

  // This check is great! It acts as a Type Guard.
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }

  return context;
};
