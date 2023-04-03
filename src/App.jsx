import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import ShoppingList from "./pages/ShoppingList";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import RequireAuth from "./components/layout/RequireAuth";
import { useRefresh } from "./hooks/useRefresh";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  useRefresh();
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ShoppingList />} />
        <Route element={<RequireAuth authRequired={false} />}>
          <Route path="/signin" exact element={<Signin />} />
          <Route path="/signup" exact element={<Signup />} />
        </Route>
        {/* protected routes */}
        <Route element={<RequireAuth authRequired={true} />}>
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>
      </Route>
    </Routes>
  );
}
