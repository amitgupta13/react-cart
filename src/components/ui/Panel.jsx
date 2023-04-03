import classNames from "classnames";
import classes from "./Panel.module.css";

function Panel({ children, className, ...rest }) {
  const finalClassNames = classNames(classes.panel, className);

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
