import { createContext, useState, useContext, useEffect } from "react";
import supabase from "../supabaseClient";

interface AuthContextTypes {
  session: User;
  loading: boolean;
  signUpNewUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<SignupResult>;
  signIn: (email: string, password: string) => Promise<SignupResult>;
  signOut: () => Promise<void>;
}

type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
} | null;

interface SignupResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<User>(null);

  const [loading, setLoading] = useState(true);

  const signUpNewUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<SignupResult> => {
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
    return { success: true, data };
  };

  const signIn = async (
    email: string,
    password: string,
  ): Promise<SignupResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // console.log(data);
    if (error) {
      console.error("Error signing in:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  };

  /*
   * Why isMounted?
   * --------------
   * Prevents "state update on unmounted component" errors.
   *
   * Problem: If user navigates away while async operations (like fetchUserRole)
   * are still running, those operations will try to call setSession() on a
   * component that no longer exists → causes errors/memory leaks.
   *
   * Solution: Track if component is still mounted. Only call setState if it is.
   * When component unmounts, the cleanup function sets isMounted = false.
   *
   * Timeline:
   * 1. Mount → isMounted = true
   * 2. Start async fetch
   * 3. User navigates away → cleanup runs → isMounted = false
   * 4. Async finishes → checks isMounted → false → skips setState ✓
   */

  useEffect(() => {
    let isMounted = true;

    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      // console.log(session)

      if (session?.user) {
        const userData = session.user;

        // console.log(userData);

        const user: User = {
          firstName: userData.user_metadata.first_name,
          lastName: userData.user_metadata.last_name,
          email: userData.user_metadata.email,
          id: userData.id,
        };

        setSession(user);
        setLoading(false);
      } else {
        setSession(null);
        setLoading(false);
      }
    };

    initSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        if (session) {
          const user: User = {
            firstName: session.user.user_metadata.first_name,
            lastName: session.user.user_metadata.last_name,
            email: session.user.user_metadata.email,
            id: session.user.id,
          };
          setSession(user);
        }else{
          setSession(null)
          setLoading(false)
        }
      },
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, signUpNewUser, signOut, signIn }}
    >
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
