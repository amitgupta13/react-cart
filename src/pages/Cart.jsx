import { useAddToCartMutation, useGetCartQuery } from "../store";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import classes from "./Cart.module.css";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { data, isFetching, error } = useGetCartQuery();
  const [doAddToCart] = useAddToCartMutation();
  const { showToast, ToastContainer } = useToast();
  const navigate = useNavigate();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch</div>;
  if (!data?.items?.length) return <div>Cart Empty</div>;

  const removeFromCartHandler = async (item) => {
    const removed = data.items
      .filter((i) => i.book._id !== item.book._id)
      .map((filteredItems) => ({
        quantity: filteredItems.quantity,
        book: filteredItems.book._id,
      }));
    try {
      await doAddToCart({
        items: removed,
      }).unwrap();
      showToast("Item removed from cart", "success");
    } catch (err) {
      showToast("Error removing Item from cart", "error");
    }
  };

  let subTotal = 0;
  const cartItems = data?.items?.map((item) => {
    subTotal += item.book.price * item.quantity;
    return (
      <Card className={classes.card} key={item.book._id}>
        <div className={classes["cart-item"]}>
          <div>
            <h2>{item.book.title}</h2>
            <h3>Authors - {item.book.authors.join(", ")}</h3>
            <h3>Price - {item.book.price}</h3>
            <h3>Quantity - {item.quantity}</h3>
          </div>
          <div className={classes["card-right"]}>
            <Button onClick={() => removeFromCartHandler(item)} danger>
              Remove from cart
            </Button>
          </div>
        </div>
      </Card>
    );
  });
  return (
    <div>
      {cartItems}
      <div>
        <h2>Sub Total - ${subTotal}</h2>
        <Button onClick={() => navigate("/checkout")} success>
          Checkout
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
