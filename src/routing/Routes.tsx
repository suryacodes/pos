import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Dashboard, {
  Products,
  OrderHistory,
  ProductDetail,
} from "../pages/dashboard";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoute redirectTo={"signin"} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  );
}

export default AppRoutes;
