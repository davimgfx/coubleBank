//Right e wrong Input
const wrongInput = (...input) =>
  input.map((elem) => (elem.style.border = "1px solid red"));
const rightInput = (...input) =>
  input.map((elem) => (elem.style.border = "none"));

// Create Usernames
const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

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


export { wrongInput, rightInput, createUsernames, formatMovementDate};

