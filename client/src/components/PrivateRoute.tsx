import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default PrivateRoute;
