import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }
  return children;
};
