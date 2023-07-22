import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import classes from "./Signin.module.css";
import { setCredentials, useLoginMutation } from "../store";
import { useDispatch } from "react-redux";
import Input from "../components/ui/Input";
import { authMode, signinFormInputs } from "./formStructure";
import { useFormState } from "../hooks/useFormState";

export default function Signin() {
  const [doLogin, result] = useLoginMutation();
  const dispatch = useDispatch();

  const { values, onChange, formRef } = useFormState({
    email: "",
    mobile: "",
    password: "",
    type: "email",
  });

  const inputs = signinFormInputs.filter((inp) =>
    ["email", "mobile"].includes(inp.name) && inp.name !== values.type
      ? false
      : true
  );

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current.checkValidity()) return;
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
          <Button className={classes["auth-button"]} primary>
            Sign in
          </Button>
          {result.isError && (
            <p className={classes.error}>{result.error?.data?.error}</p>
          )}
        </div>
      </form>
    </Card>
  );
}
