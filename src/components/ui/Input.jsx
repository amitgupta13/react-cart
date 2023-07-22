import { useEffect, useRef, useState } from "react";
import classes from "./Input.module.css";
import classNames from "classnames";

export default function Input({
  label,
  errorMessage,
  id,
  disableDefaultStyle,
  ...rest
}) {
  const inputRef = useRef();
  const [valid, setValid] = useState(true);
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => setFocused(true);

  useEffect(() => {
    if (rest.expression) {
      setValid(() => {
        const validity = new RegExp(rest.expression).test(rest.value);
        if (!validity) {
          inputRef.current.setCustomValidity("invalid");
        } else {
          inputRef.current.setCustomValidity("");
        }

        return validity;
      });
    } else {
      setValid(inputRef.current.checkValidity());
    }
  }, [rest.expression, rest.value]);

  const defaultClass =
    rest.type === "radio"
      ? {
          [classes.radio]: true,
        }
      : {
          [classes.formInput]: true,
        };

  let aggregateClasses = classNames(
    rest.className,
    disableDefaultStyle ? null : defaultClass
  );

  return (
    <div className={aggregateClasses}>
      <label>{label}</label>
      <input
        ref={inputRef}
        {...rest}
        onBlur={handleFocus}
        valid={valid ? "true" : "false"}
        onFocus={() => rest.name === "password" && setFocused(true)}
        focused={focused.toString()}
      />
      <span className={classes.error}>{errorMessage}</span>
    </div>
  );
}
