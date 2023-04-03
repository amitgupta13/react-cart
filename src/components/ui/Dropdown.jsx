import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";
import classes from "./Dropdown.module.css";

function Dropdown({ options, value, onChange, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

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
    <div {...rest} ref={divEl} className={classes["dropdown-main"]}>
      <Panel className={classes["dropdown-panel"]} onClick={handleClick}>
        {value?.label || "Select..."}
        <GoChevronDown className={classes["text-lg"]} />
      </Panel>
      {isOpen && (
        <Panel className={classes["dropdown-options"]}>{renderedOptions}</Panel>
      )}
    </div>
  );
}

export default Dropdown;
