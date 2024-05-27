import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard, {
  Products,
  OrderHistory,
  ProductDetail,
  Home,
} from "../pages/dashboard";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoute redirectTo={"signin"} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index={true} element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;
