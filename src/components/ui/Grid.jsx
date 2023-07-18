import classes from "./Grid.module.css";
import Card from "./Card";

export default function Grid({ data, keyFn, renderFn }) {
  return (
    <div className={classes.grid}>
      {data.map((item) => (
        <Card key={keyFn(item)}>{renderFn(item)}</Card>
      ))}
    </div>
  );
}
