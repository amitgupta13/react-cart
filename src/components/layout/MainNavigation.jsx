import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";
import { useNavSettings } from "../../hooks/useNavSettings";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function MainNavigation() {
  const navigate = useNavigate();
  const { toggleDropdown, elementRef, isOpen, setIsOpen } = useNavSettings();

  const handleOptionClick = (option) => {
    setIsOpen(false);
    navigate(option.route);
  };

  const { logout, isLoggedIn } = useLogout();

  const options = [
    {
      label: "Change password",
      value: "changePassword",
      route: "/changepassword",
    },
  ];

  const renderedOptions = options.map((option) => {
    return (
      <div
        className={classes.option}
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">Shopping Cart</Link>
      </div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li onClick={logout}>
                <Link to="/signin">Logout</Link>
              </li>
              <li>
                <div ref={elementRef} className={classes["nav-icon"]}>
                  <BsFillGearFill onClick={toggleDropdown} />
                  {isOpen && (
                    <div className={classes["nav-dropdown-options"]}>
                      {renderedOptions}
                    </div>
                  )}
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
