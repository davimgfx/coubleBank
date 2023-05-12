
const account1 = {
  owner: "João Schut",
  movements: [200, 450.81, -400.8, 3000, -650, -130.01, 70, 1300],
  interestRate: 1.2,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
    "2023-05-09T10:51:36.790Z",
  ],
  pin: 1111,
  currency: "BRL",
  locale: "pt-BR",
};

const account2 = {
  owner: "Jess Neves",
  movements: [5000, 3400, -150, -790, -321.01, -10.02, 8500, -30],
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2021-06-25T18:49:59.371Z",
    "2021-07-26T12:01:20.894Z",
  ],
  interestRate: 1.5,
  pin: 2222,
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400],
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2021-05-27T17:01:17.194Z",
    "2021-07-11T23:36:17.929Z",
  ],
  interestRate: 0.7,
  pin: 3333,
  currency: "EUR",
  locale: "pt-PT",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  movementsDates: [
    "2019-05-23T17:50:12.892Z",
    "2020-06-07T23:09:28.203Z",
    "2021-06-29T19:39:43.314Z",
    "2022-07-02T20:59:31.721Z",
    "2022-08-06T11:13:59.661Z",
  ],
  pin: 4444,
  currency: "USD",
  locale: "en-US",
};

const account5 = {
  owner: "Tricy Estevi Steven Thurance",
  movements: [430, 1000, -700, 50, 90, 500, -400, 100],
  movementsDates: [
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
    "2021-05-07T08:15:11.199Z",
    "2022-01-12T02:50:38.854Z",
    "2022-07-03T22:01:02.521Z",
    "2022-06-04T10:48:30.790Z",
    "2020-10-18T02:30:19.540Z",
    "2022-04-21T21:14:09.742Z",
  ],
  interestRate: 1,
  pin: 1234,
  currency: "EUR",
  locale: "pt-PT",
};

const accounts = [account1, account2, account3, account4, account5];

export {accounts};
