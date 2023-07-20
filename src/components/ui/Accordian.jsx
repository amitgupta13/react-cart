import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import classes from "./Accordian.module.css";

function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleClick = (nextIndex) => {
    setExpandedIndex((currentExpandedIndex) => {
      if (currentExpandedIndex === nextIndex) {
        return -1;
      } else {
        return nextIndex;
      }
    });
  };

  const renderedItems = items.map((item, index) => {
    const isExpanded = index === expandedIndex;

    return (
      <div key={item.id}>
        <div className={classes.accordian} onClick={() => handleClick(index)}>
          {item.label}
          {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
        {isExpanded && <div className={classes.content}>{item.content}</div>}
      </div>
    );
  });

  return <div className={classes["accordian-main"]}>{renderedItems}</div>;
}

export default Accordion;
