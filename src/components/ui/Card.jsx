import classes from "./Card.module.css";
import classNames from "classnames";

function Card(props) {
  return (
    <div className={classNames(classes.card, props.className)}>
      {props.children}
    </div>
  );
}

export default Card;
