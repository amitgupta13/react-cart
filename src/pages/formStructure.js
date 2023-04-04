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
