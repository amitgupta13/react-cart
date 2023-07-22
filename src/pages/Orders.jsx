import { useGetOrdersQuery } from "../store";
import Card from "../components/ui/Card";
import classes from "./Orders.module.css";
import { status } from "../constants/appConstants";
import Accordion from "../components/ui/Accordian";
import book from "../images/book1.jpg";

export default function Orders() {
  const { data, isFetching, error } = useGetOrdersQuery();

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch</div>;
  if (!data?.length) return <div>Orders Empty</div>;

  const renderItems = (items) => {
    return items.map((item) => ({
      id: item.book._id,
      label: item.book.title,
      content: (
        <Card className={classes.book} key={item.book._id}>
          <div className={classes["cart-item"]}>
            <div className={classes["order-item"]}>
              <div>
                <h2>{item.book.title}</h2>
                <h3>Authors - {item.book.authors.join(", ")}</h3>
                <h3>Price - {item.book.price}</h3>
                <h3>Quantity - {item.quantity}</h3>
              </div>
              <img className={classes.image} src={book} alt="" />
            </div>
          </div>
        </Card>
      ),
    }));
  };

  return (
    <div>
      {data.map((item) => {
        return (
          <Card key={item._id} className={classes.order}>
            <div>
              <h2>Order - </h2>
              <h4>Transaction Id - {item.transactionId}</h4>
              <h3>Address - {item.address}</h3>
              <h3> Paid amount - {item.amount}</h3>
              <h4>
                Dispatch Status - {status.dispatchStatus[item.dispatchStatus]}
              </h4>
              <h4>
                Transaction Status -{" "}
                {status.dispatchStatus[item.transactionStatus]}
              </h4>
            </div>
            <h4>Items - </h4>
            {<Accordion items={renderItems(item.items)} />}
          </Card>
        );
      })}
    </div>
  );
}
