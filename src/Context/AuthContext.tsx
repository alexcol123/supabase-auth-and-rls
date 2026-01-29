import {
  createContext,
  useState,
  useContext,
  useEffect,
  Children,
} from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState(null);
  const [loading, setloading] = useState(false);

  //https://supabase.com/docs/reference/javascript/auth-signup
  const { data, error } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
  });

  const signUpNewUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ signUpNewUser }}>
      {children}
    </AuthContext.Provider>
  );
};
