"use strict";
import {
  labelWelcome,
  labelBalance,
  labelDate,
  labelSumIn,
  labelSumInterest,
  labelSumOut,
  containerApp,
  containerMovements,
  btnClose,
  btnLoan,
  btnTransfer,
  btnLogin,
  btnSort,
  inputClosePin,
  inputCloseUsername,
  inputLoanAmount,
  inputLoginPin,
  inputLoginUsername,
  inputTransferAmount,
  inputTransferTo,
} from "./dom.js";

import { accounts } from "./accounts.js";

import {
  rightInput,
  wrongInput,
  createUsernames,
  formatMovementDate,
} from "./functions.js";

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
createUsernames(accounts);

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

  const outcomes = Math.abs(
    acc.movements
      .filter((movement) => movement < 0)
      .reduce((acc, movement) => acc + movement, 0)
  );
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

let currentAccount;
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(" ")[0]}!`;
    rightInput(inputLoginUsername, inputLoginPin);
    containerApp.style.opacity = 100;
    //Clear the input
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    //Day actual
    const now = new Date();
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    //const locale = navigator.language
    const locale = currentAccount.locale;
    labelDate.textContent = `Today is ${Intl.DateTimeFormat(
      locale,
      options
    ).format(now)}`;
    updateUI(currentAccount);
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
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
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
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());
    rightInput(inputTransferAmount, inputTransferTo);
    updateUI(currentAccount);
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
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date());
      updateUI(currentAccount);
      rightInput(inputLoanAmount);
    }, 3000);
  } else {
    wrongInput(inputLoanAmount);
  }
  inputLoanAmount.value = "";
});

//Sort movements
let sortedStates = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovement(currentAccount, !sortedStates);
  sortedStates = !sortedStates;
});
