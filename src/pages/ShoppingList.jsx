import classes from "./ShoppingList.module.css";
import Button from "../components/ui/Button";
import {
  useAddToCartMutation,
  useGetBooksQuery,
  useGetCartQuery,
} from "../store";
import Grid from "../components/ui/Grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/ui/Pagination";
import { useState } from "react";
import { useToast } from "../hooks/useToast";

let PageSize = 6;

export default function ShoppingList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { showToast, ToastContainer } = useToast();
  const { data, error, isFetching } = useGetBooksQuery({
    page: currentPage,
    limit: PageSize,
  });

  const cartResults = useGetCartQuery();

  const [doAddToCart] = useAddToCartMutation();

  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loginStatus.isLoggedIn);

  const addToCartHandler = async (item) => {
    if (!isLoggedIn) return navigate("/signin");

    const cartItems = cartResults?.data?.items
      ? cartResults?.data?.items.map((i) => ({
          quantity: i.quantity,
          book: i.book._id,
        }))
      : [];

    const itemExists = cartItems.find((ci) => ci.book === item._id);
    if (itemExists) {
      itemExists.quantity = itemExists.quantity + 1;
    } else {
      cartItems.push({ quantity: 1, book: item._id });
    }

    try {
      await doAddToCart({
        items: cartItems,
      }).unwrap();
      showToast("Item added to Cart", "success");
    } catch (err) {
      showToast("Error adding items to cart", "error");
    }
  };

  const renderFn = (item) => {
    return (
      <div className={classes["grid-item"]}>
        <div className={classes.header}>
          <h1>{item.title}</h1>
          <img className={classes.image} src={item.url} alt="" />
        </div>
        <h4>Authors - {item.authors.join(", ")}</h4>
        <h4>Price - ${item.price}</h4>
        <Button onClick={() => addToCartHandler(item)} primary>
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
      <div className={classes.shoppinglist}>
        <Grid data={data.data} keyFn={(item) => item._id} renderFn={renderFn} />
        <Pagination
          currentPage={data.currentPage}
          totalCount={data.totalCount}
          pageSize={data.limit}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <ToastContainer />
      </div>
    );
}
