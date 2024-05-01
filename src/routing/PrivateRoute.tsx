import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageUtil } from "../utils";

interface PrivateRouteProps {
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "signin",
}) => {
  const isAuthUser = LocalStorageUtil.load("token");
  return isAuthUser ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
