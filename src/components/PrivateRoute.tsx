import { Navigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = UserAuth();

  if (loading) return <div>Loading...</div>;

  if (!session) return <Navigate to="/sign-up" />;

  return children;
};

export default PrivateRoute;
