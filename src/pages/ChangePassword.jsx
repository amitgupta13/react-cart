import { useRef, useState } from "react";
import { changePasswordInputs } from "./formStructure";
import classes from "./Signin.module.css";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useChangePasswordMutation } from "../store";

export default function ChangePassword() {
  const [doChange, result] = useChangePasswordMutation();
  console.log(result);
  const formRef = useRef();
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    valid: false,
  });

  const onChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      valid: formRef.current.checkValidity(),
    });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    doChange({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <Card>
      <h1 className={classes.heading}>Change Password</h1>
      <form ref={formRef} onSubmit={handleOnSubmit}>
        <div className={classes["form-signin"]}>
          {changePasswordInputs.map((input) => (
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
            Change Password
          </Button>
        </div>
      </form>
    </Card>
  );
}
