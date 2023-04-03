import { useState } from "react";
import classes from "./Input.module.css";
import classNames from "classnames";

export default function Input({ label, errorMessage, id, ...rest }) {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => setFocused(true);

  const defaultClass =
    rest.type === "radio"
      ? {
          [classes.radio]: true,
        }
      : {
          [classes.formInput]: true,
        };

  let aggregateClasses = classNames(rest.className, defaultClass);

  return (
    <div className={aggregateClasses}>
      <label>{label}</label>
      <input
        {...rest}
        onBlur={handleFocus}
        onFocus={() => rest.name === "password" && setFocused(true)}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
}
