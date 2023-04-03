import className from "classnames";
import classes from "./Button.module.css";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  const aggegrateClass = className(rest.className, classes.content, {
    [classes.primary]: primary,
    [classes.secondary]: secondary,
    [classes.success]: success,
    [classes.warning]: warning,
    [classes.danger]: danger,
    [classes.rounded]: rounded,
    [classes.outline]: outline,
    [classes["outline-primary"]]: outline && primary,
    [classes["outline-secondary"]]: outline && secondary,
    [classes["outline-success"]]: outline && success,
    [classes["outline-warning"]]: outline && warning,
    [classes["outline-danger"]]: outline && danger,
  });

  return (
    <button {...rest} className={aggegrateClass}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
      return new Error(
        "Only one of primary, secondary, success, warning, danger can be true"
      );
    }
  },
};

export default Button;
