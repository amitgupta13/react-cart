export const regex = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!.%*?&]{8,}$/,
  cardExpiry: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
  mobile: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  cvv: /^[0-9]{3,4}$/,
};

export const status = {
  transactionStatus: {
    0: "PENDING",
    1: "SUCCESS",
    2: "FAILED",
  },

  dispatchStatus: {
    0: "PENDING",
    1: "INITIATED",
    2: "DISPATCHED",
    3: "DELIVERED",
  },
};
