import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout({ checkingAuth }) {
  return (
    <div>
      <MainNavigation checkingAuth={checkingAuth} />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
