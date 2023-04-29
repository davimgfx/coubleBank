"use strict";
//Day actually
const currentDate = new Date();

const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const year = currentDate.getFullYear();

const formattedDate = `${month.toString().padStart(2, "0")}/${day
	.toString()
	.padStart(2, "0")}/${year}`;

const element = document.querySelector("#current-date");

element.textContent = formattedDate;

// Data
const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300, -0.5],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: "Sarah Smith",
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const account5 = {
	owner: "Test E S Test",
	movements: [430, 1000, 700, 50, 90, 500, -400, 100],
	interestRate: 1,
	pin: 1234,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
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

// displayMovement
const displayMovement = function (movements) {
	containerMovements.innerHTML = "";

	movements.forEach(function (mov, i) {
		const type = mov > 0 ? "deposit" : "withdrawal";
		const color = mov > 0 ? "#66c873" : "#f5465d";
		const html = `<div class="movements__row">
					<div class="movements__type movements__type--${type} ">${i + 1} ${type}</div>
					<div class="movements__value" style="color: ${color};">${Math.abs(mov)}€</div>
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

//displaySummary
const calcDisplaySummary = function (movements) {
	const incomes = movements
		.filter((movement) => movement > 0)
		.reduce((acc, movement) => acc + movement, 0);
	const outcomes = movements
		.filter((movement) => movement < 0)
		.reduce((acc, movement) => acc + movement, 0);
	labelSumIn.textContent = `${incomes}€`;
	labelSumOut.textContent = `${Math.abs(outcomes)}€`;

	const interest = movements
		.filter((movement) => movement > 0)
		.map((deposit) => deposit * 0.012)
		.filter((int) => {
			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

// displayBalance
const calcDisplayBalance = function (movement) {
	const balance = movement.reduce((acc, cur) => acc + cur, 0);
	labelBalance.textContent = `${balance}€`;
};

// Event handlers
let currentAcount;
btnLogin.addEventListener("click", function (event) {
	event.preventDefault();
	currentAcount = accounts.find(
		(acc) => acc.username === inputLoginUsername.value
	);

	if (currentAcount?.pin === Number(inputLoginPin.value)) {
		labelWelcome.textContent = `Welcome ${
			currentAcount.owner.split(" ")[0]
		}!`;
		containerApp.style.opacity = 100;
		displayMovement(currentAcount.movements);
		calcDisplaySummary(currentAcount.movements);
		calcDisplayBalance(currentAcount.movements);
	}
});
