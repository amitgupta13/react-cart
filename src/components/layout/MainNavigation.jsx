import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { BsFillGearFill, BsCartFill } from "react-icons/bs";
import { useNavSettings } from "../../hooks/useNavSettings";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../../store";
import className from "classnames";

export default function MainNavigation() {
  const navigate = useNavigate();
  const { toggleDropdown, elementRef, isOpen, setIsOpen } = useNavSettings();

  const handleOptionClick = (option) => {
    setIsOpen(false);
    navigate(option.route);
  };

  const { logout, isLoggedIn } = useLogout();
  const { data } = useGetCartQuery({}, { skip: !isLoggedIn });

  const options = [
    {
      label: "Change password",
      value: "changePassword",
      route: "/changepassword",
    },
    {
      label: "Orders",
      value: "orders",
      route: "/orders",
    },
  ];

  const renderedOptions = options.map((option) => {
    return (
      <div
        className={classes.option}
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        <hr />
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
              <li classes={classes.pointer} onClick={logout}>
                <Link to="/signin">Logout</Link>
              </li>
              <li>
                <div
                  ref={elementRef}
                  className={className(classes.pointer, classes["nav-icon"])}
                >
                  <BsFillGearFill
                    className={classes.svg}
                    onClick={toggleDropdown}
                  />
                  {isOpen && (
                    <div className={classes["nav-dropdown-options"]}>
                      {renderedOptions}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div
                  onClick={() => navigate("/cart")}
                  className={className(classes.pointer, classes["cart-icon"])}
                >
                  <BsCartFill className={classes.svg} />

                  {data?.items.length ? (
                    <div className={classes["cart-count"]}>
                      {data?.items.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </div>
                  ) : null}
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
