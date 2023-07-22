import { useState, useRef } from "react";

export function useFormState(initialState) {
  const [values, setValues] = useState(initialState);
  const formRef = useRef();

  const onChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  return {
    values,
    setValues,
    onChange,
    formRef,
  };
}
