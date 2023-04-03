import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ authRequired }) => {
  let { isLoggedIn } = useSelector((state) => state.loginStatus);
  let redirectPath = "/signin";
  if (!authRequired) {
    isLoggedIn = !isLoggedIn;
    redirectPath = "/";
  }
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} replace />
  );
};
export default RequireAuth;
