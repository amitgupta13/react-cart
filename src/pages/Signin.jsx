import { useRef, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import classes from "./Signin.module.css";
import { setCredentials, useLoginMutation } from "../store";
import { useDispatch } from "react-redux";
import Input from "../components/ui/Input";
import { authMode, signinFormInputs } from "./formStructure";

export default function Signin() {
  const [doLogin] = useLoginMutation();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    mobile: "",
    password: "",
    type: "email",
    valid: false,
  });

  const inputs = signinFormInputs.filter((inp) =>
    ["email", "mobile"].includes(inp.name) && inp.name !== values.type
      ? false
      : true
  );

  const formRef = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await doLogin({
      [values.type]: values.type === "email" ? values.email : values.mobile,
      password: values.password,
      type: values.type,
    }).unwrap();
    localStorage.setItem("accessToken", data?.accessToken);
    localStorage.setItem("refreshToken", data?.refreshToken);
    dispatch(setCredentials(data));
    formRef.current.reset();
  };

  const onChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      valid: formRef.current.checkValidity(),
    });

  return (
    <Card>
      <h1 className={classes.heading}>Sign In</h1>
      <form ref={formRef} onSubmit={handleOnSubmit}>
        <div className={classes["form-signin"]}>
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <div className={classes["signin-option"]}>
            <p>Sign in with: </p>
            {authMode.map((mode) => (
              <Input
                key={mode.id}
                {...mode}
                checked={values.type === mode.value}
                onChange={onChange}
              />
            ))}
          </div>
          <Button
            disabled={!values.valid}
            className={classes["auth-button"]}
            primary
          >
            Sign in
          </Button>
        </div>
      </form>
    </Card>
  );
}
