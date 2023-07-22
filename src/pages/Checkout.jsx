import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useFormState } from "../hooks/useFormState";
import { checkoutForm } from "./formStructure";
import classes from "./Checkout.module.css";
import { useAddOrderMutation, useGetCartQuery } from "../store";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

export default function Checkout() {
  const navigate = useNavigate();
  const { showToast, ToastContainer } = useToast();
  const { data, isFetching, error } = useGetCartQuery();
  const [doAddOrder] = useAddOrderMutation();
  const { values, onChange, formRef } = useFormState({
    cardnumber: "",
    cvv: "",
    expiry: "",
    address: "",
  });

  //Fake card token from gateway
  const getCardToken = () => Math.random().toString(36).substr(2);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current.checkValidity()) return;
    try {
      await doAddOrder({
        address: values.address,
        cardToken: getCardToken(),
      }).unwrap();
      navigate("/orders");
    } catch (err) {
      console.log(err);
      showToast("Error placing order", "error");
    }
  };

  const renderInputs = checkoutForm.map((input) => (
    <Input
      key={input.id}
      {...input}
      value={values[input.name]}
      onChange={onChange}
    />
  ));

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Failed to fetch</div>;
  if (!data?.items?.length) return <div>Cart Empty</div>;

  return (
    <div>
      <Card className={classes.checkout}>
        <h2>
          Total no of items -{" "}
          {data.items.reduce((acc, item) => acc + item.quantity, 0)}
        </h2>
        <h2>
          Amount Payable - $
          {data.items.reduce(
            (acc, item) => acc + item.book.price * item.quantity,
            0
          )}
        </h2>
        <form onSubmit={handleOnSubmit} ref={formRef}>
          {renderInputs}
          <Button primary>Make Payment</Button>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}
