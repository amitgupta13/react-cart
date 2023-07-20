import { regex } from "../constants/appConstants";

export const checkoutForm = [
  {
    id: 1,
    name: "address",
    type: "textarea",
    placeholder: "Address...",
    errorMessage: "Enter a valid address",
    label: "Address",
    required: true,
  },
  {
    id: 2,
    name: "cardnumber",
    type: "text",
    placeholder: "xxxx-xxxx-xxxx",
    errorMessage: "Enter a valid card number",
    label: "Card Number",
    pattern: "[0-9]+",
    required: true,
  },
  {
    id: 3,
    name: "cvv",
    type: "text",
    placeholder: "xxx",
    errorMessage: "Enter a valid cvv",
    label: "CVV",
    pattern: "[0-9]+",
    required: true,
  },
  {
    id: 4,
    name: "expiry",
    type: "text",
    placeholder: "09/12",
    label: "Card Expiry",
    errorMessage: "Enter a valid card expiry",
    pattern: regex.cardExpiry,
    required: true,
  },
];

export const signinFormInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
  {
    id: 2,
    name: "mobile",
    type: "text",
    placeholder: "124-245-896",
    label: "Mobile",
    pattern: "[0-9]+",
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be at least 8 characters and have 1 uppercase, 1 lowercase, a number and a special character.",
    label: "Password",
    required: true,
  },
];

export const changePasswordInputs = [
  {
    id: 1,
    name: "currentPassword",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be at least 8 characters and have 1 uppercase, 1 lowercase, a number and a special character.",
    label: "Current Password",
    required: true,
  },
  {
    id: 2,
    name: "newPassword",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be at least 8 characters and have 1 uppercase, 1 lowercase, a number and a special character.",
    label: "New Password",
    required: true,
  },
  {
    id: 3,
    name: "confirmPassword",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be at least 8 characters and have 1 uppercase, 1 lowercase, a number and a special character.",
    label: "Confirm Password",
    required: true,
  },
];

export const authMode = [
  {
    id: 1,
    name: "type",
    type: "radio",
    label: "Email",
    value: "email",
  },
  {
    id: 2,
    name: "type",
    type: "radio",
    label: "Mobile",
    value: "mobile",
  },
];
