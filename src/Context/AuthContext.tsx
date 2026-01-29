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

// 4. The hook
export const UserAuth = () => {
  const context = useContext(AuthContext);

  // This check is great! It acts as a Type Guard.
  if (!context) {
    throw new Error("UserAuth must be used within an AuthContextProvider");
  }

  return context;
};
