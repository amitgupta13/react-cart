import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import classes from "./Signin.module.css";
import { setCredentials } from "../store";
import { useDispatch } from "react-redux";
import Input from "../components/ui/Input";
import { signupFormInputs } from "./formStructure";
import { useFormState } from "../hooks/useFormState";
import { useSignupMutation } from "../store/api/authApi";

export default function Signup() {
  const [doSignup, result] = useSignupMutation();
  const dispatch = useDispatch();

  const { values, onChange, formRef } = useFormState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    valid: false,
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = await doSignup(values).unwrap();
    localStorage.setItem("accessToken", data?.accessToken);
    localStorage.setItem("refreshToken", data?.refreshToken);
    dispatch(setCredentials(data));
    formRef.current.reset();
  };

  return (
    <Card>
      <h1 className={classes.heading}>Sign Up</h1>
      <form ref={formRef} onSubmit={handleOnSubmit}>
        <div className={classes["form-signin"]}>
          {signupFormInputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <Button
            disabled={!values.valid}
            className={classes["auth-button"]}
            primary
          >
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
