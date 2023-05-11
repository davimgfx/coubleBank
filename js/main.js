"use strict";
//Data
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

//Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Format Movement Date

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 28) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

//Display Movement
const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const color = mov > 0 ? "#66c873" : "#f5465d";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = new Intl.NumberFormat(acc.locale, {
      style: "currency",
      currency: acc.currency,
    }).format(mov);
    const html = `<div class="movements__row">
					<div class="movements__type movements__type--${type} ">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
					<div class="movements__value" style="color: ${color};">${formattedMov}
          </div>
				  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//Computing Usernames
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

//Right e wrong input
const wrongInput = (...input) =>
  input.map((elem) => (elem.style.border = "1px solid red"));
const rightInput = (...input) =>
  input.map((elem) => (elem.style.border = "none"));

//Update UI
const updateUI = function (acc) {
  displayMovement(acc);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc);
};

//Display Balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  
  labelBalance.textContent = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(acc.balance);
};

//Display Summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((movement) => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumIn.textContent = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(incomes);

  const outcomes = Math.abs(acc.movements
    .filter((movement) => movement < 0)
    .reduce((acc, movement) => acc + movement, 0));
  labelSumOut.textContent = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(outcomes);

  const interest = acc.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(interest);
};


// =================Event handlers================
//Login

let currentAcount;

currentAcount = account1;
updateUI(currentAcount);
containerApp.style.opacity = 100;

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAcount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAcount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome ${currentAcount.owner.split(" ")[0]}!`;
    rightInput(inputLoginUsername, inputLoginPin);
    containerApp.style.opacity = 100;
    //Clear the input
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    //Day actual
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    //const locale = navigator.language
    const locale = currentAcount.locale;
    labelDate.textContent = Intl.DateTimeFormat(locale, options).format(now);
    updateUI(currentAcount);
  } else {
    wrongInput(inputLoginUsername, inputLoginPin);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
});

//Close account
btnClose.addEventListener("click", function (e) {
  //To not restart the page when clicking in the close button
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAcount.username &&
    +inputClosePin.value === currentAcount.pin
  ) {
    const index = accounts.findIndex(
      (account) => account.username === currentAcount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    rightInput(inputCloseUsername, inputClosePin);
    labelWelcome.textContent = `Log in to get started`;
  } else {
    wrongInput(inputCloseUsername, inputClosePin);
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

//Transfer money
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // Clear input
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAcc &&
    currentAcount.balance >= amount &&
    receiverAcc?.username !== currentAcount.username
  ) {
    currentAcount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAcount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());
    rightInput(inputTransferAmount, inputTransferTo);
    updateUI(currentAcount);
  } else {
    wrongInput(inputTransferAmount, inputTransferTo);
  }
});

//Loan money
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAcount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAcount.movements.push(amount);
    currentAcount.movementsDates.push(new Date());
    updateUI(currentAcount);
    rightInput(inputLoanAmount);
  } else {
    wrongInput(inputLoanAmount);
  }
  inputLoanAmount.value = "";
});

//Sort movements
let sortedStates = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovement(currentAcount, !sortedStates);
  sortedStates = !sortedStates;
});
