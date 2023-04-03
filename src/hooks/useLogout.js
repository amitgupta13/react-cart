import { useDispatch, useSelector } from "react-redux";
import { logOut, useLogoutMutation } from "../store";

export function useLogout() {
  const dispatch = useDispatch();
  const [doLogout, result] = useLogoutMutation();
  const { isLoggedIn, refreshToken } = useSelector(
    ({ loginStatus }) => loginStatus
  );

  const logout = () => {
    if (isLoggedIn && refreshToken) {
      doLogout({
        token: refreshToken,
      });
      dispatch(logOut());
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
  };

  return { logout, result, isLoggedIn };
}
