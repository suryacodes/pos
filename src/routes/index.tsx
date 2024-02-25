import { createBrowserRouter } from "react-router-dom";
import {
  Dashboard,
  Home,
  Menu,
  Setting,
  OrderHistory,
  Signin,
  Profile,
} from "../pages";
import PrivateRoute from "./private-route";

const Routes = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "setting", element: <Setting /> },
      { path: "order-history", element: <OrderHistory /> },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
]);

export default Routes;
