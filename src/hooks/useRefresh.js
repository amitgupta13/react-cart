import { logOut, setCredentials, useRefreshMutation } from "../store";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export function useRefresh() {
  const [doRefresh, result] = useRefreshMutation();
  const dispatch = useDispatch();

  const refresh = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const data = await doRefresh({ token: refreshToken }).unwrap();
        localStorage.setItem("accessToken", data?.accessToken);
        dispatch(
          setCredentials({
            refreshToken,
            ...data,
          })
        );
      }
    } catch (err) {
      console.log({ err });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logOut());
    }
  }, [dispatch, doRefresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return result;
}
