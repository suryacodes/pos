import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  let auth = { token: false };
  return auth.token ? <>{children}</> : <Navigate to="/signin" />;
};

export default PrivateRoute;
