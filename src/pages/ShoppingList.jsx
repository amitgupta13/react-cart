import classes from "./ShoppingList.module.css";
import Button from "../components/ui/Button";
import { useGetBooksQuery } from "../store";
import Grid from "../components/ui/Grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ShoppingList() {
  const { data, error, isFetching } = useGetBooksQuery();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loginStatus.isLoggedIn);

  const addToCartHandler = () => {
    if (!isLoggedIn) return navigate("/signin");
  };

  const renderFn = (item) => {
    return (
      <div className={classes["grid-item"]}>
        <h1>{item.title}</h1>
        <h4>Authors - {item.authors.join(", ")}</h4>
        <h4>Price - ${item.price}</h4>
        <Button onClick={addToCartHandler} primary>
          {" "}
          Add to Cart
        </Button>
      </div>
    );
  };

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch</div>;
  if (data)
    return (
      <div>
        <Grid data={data.data} keyFn={(item) => item._id} renderFn={renderFn} />
      </div>
    );
}
