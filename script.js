'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Old Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// New Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-05-25T17:01:17.194Z',
    '2022-05-28T10:36:17.929Z',
    '2022-06-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const currentDate = new Date();
  const calcDaysPassed = (date, currentDate) =>
    Math.round(Math.abs(currentDate - date) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log('--------days passed---');
  console.log(daysPassed);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // One way
    // const day = `${date.getDate()}`.padStart(2, 0); // adding 0 if the month is less than 10 (2 caracteres)
    // const month = `${date.getMonth()}`.padStart(2, 0);
    // const year = date.getFullYear();
    // // The format we want day/month/year
    // return `${day}/${month}/${year}`;

    // Another way, using API Intl
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  const options = {
    style: 'currency',
    currency: currency,
  };

  return new Intl.NumberFormat(locale, options).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    // const options = {
    //   style: 'currency',
    //   currency: account.currency,
    // };

    // const formattedMov = new Intl.NumberFormat(account.locale, options).format(
    //   mov
    // );

    const formattedMov = formatCurrency(mov, account.locale, account.currency);

    // <div class="movements__value">${mov.toFixed(2)}€</div> the old solution

    const html = `    
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>               
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

// Printing the balance
const calcDisplayBalance = function (account) {
  // labelBalance.textContent = `${balance} €`; //One option of solution
  const balance = account.movements.reduce(
    (accumulator, mov) => accumulator + mov,
    0
  );
  account.balance = balance;
  // labelBalance.textContent = `${balance.toFixed(2)} €`;
  labelBalance.textContent = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};

// calcDisplayBalance(account1.movements);

// Display the summary: INCOME, OUTCOME, INTEREST
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(currentMov => currentMov > 0)
    .reduce((accumulator, currentMov) => accumulator + currentMov, 0);

  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatCurrency(
    incomes,
    account.locale,
    account.currency
  );

  const out = account.movements
    .filter(currentMov => currentMov < 0)
    .reduce((accumulator, currentMov) => accumulator + currentMov, 0);

  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    account.locale,
    account.currency
  );

  // The Bank pays you 1.2% of interest every time you make a deposit but the total interest is only if the interest of a deposit is > 1
  const interest = account.movements
    .filter(currentMov => currentMov > 0)
    .map(currentMov => (account.interestRate * currentMov) / 100)
    .filter((currentInterest, index, arr) => {
      console.log(arr);
      return currentInterest >= 1;
    })
    .reduce((accumulator, currentInterest) => accumulator + currentInterest, 0);

  // labelSumInterest.textContent = `${Math.abs(interest).toFixed(2)}€`;
  labelSumInterest.textContent = formatCurrency(
    Math.abs(interest),
    account.locale,
    account.currency
  );
};

// calcDisplaySummary(account1.movements);

//array of user accounts and for every user we have to modify the current array. So we use forEach and not MAP because map create a new array
const createUserNames = function (userAccounts) {
  userAccounts.forEach(function (userAccount) {
    userAccount.username = userAccount.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUserNames(accounts); // Get username for this case is stw
console.log(accounts);

// Update UI
const updateUI = function (account) {
  // Display movements
  displayMovements(account);

  // Display Balance
  calcDisplayBalance(account);

  // Display summary
  calcDisplaySummary(account);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0); // Convert seconds in minutes and seconds
    const sec = String(time % 60).padStart(2, 0); // Using the remainer operator

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 seconds, stop timer and log out
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time = time - 1;
  };

  // Set time 5 minutes
  let time = 120; //120 seconds

  // call timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

// EVENT handler
// Implementing LOGIN
console.log('----- LOGIN SECTION -------');
let currentAccount;
let timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimented with Date API
// const today = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: '2-digit', //show the year only 2 digits: 22,
//   weekday: 'long',
// };

// const local = navigator.language;
// console.log(local);

// labelDate.textContent = new Intl.DateTimeFormat(local, options).format(today);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting, because by default the button inside of form reload the page, to avoid that we use preventDefault
  e.preventDefault();

  currentAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value;
  });

  console.log(currentAccount);

  // if currentAccount && currentAccount.pin the same but other way is: currentAccount?.pin
  if (currentAccount && currentAccount.pin === +inputLoginPin.value) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    // Create current date and time. One way
    // const today = new Date();
    // const day = `${today.getDate()}`.padStart(2, 0); // adding 0 if the month is less than 10 (2 caracteres)
    // const month = `${today.getMonth()}`.padStart(2, 0);
    // const year = `${today.getFullYear()}`.padStart(2, 0);
    // const hour = `${today.getHours()}`.padStart(2, 0);
    // const min = `${today.getMinutes()}`.padStart(2, 0);
    // // The format we want day/month/year
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}: ${min}`;

    // Create current date and time using API
    const today = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      // month: 'long',
      month: 'numeric',
      year: '2-digit', //show the year only 2 digits: 22,
      // weekday: 'long',
    };

    // const local = navigator.language; //To get the language of the navigator of the user
    // console.log(local);
    const local = currentAccount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(local, options).format(
      today
    );

    // Clear fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur(); // To make the field lose the focus

    // Timer
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

    updateUI(currentAccount);
  }
});

// TRANSFER MONEY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferAmount = Number(inputTransferAmount.value);
  const receiverAcount = accounts.find(
    account => account.username === inputTransferTo.value
  );

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  console.log(transferAmount, receiverAcount);

  if (
    transferAmount > 0 &&
    receiverAcount &&
    receiverAcount.username !== currentAccount.username &&
    currentAccount.balance >= transferAmount
  ) {
    // Doing the transfer
    currentAccount.movements.push(-transferAmount);
    receiverAcount.movements.push(transferAmount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();

    console.log('transfer valid');
    console.log(receiverAcount, transferAmount, receiverAcount.balance);
  } else {
    console.log('TRANSFER INVALID');
  }
});

// Request LOAN functionality
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.floor(inputLoanAmount.value);

  // The condition to get a loan is: if there is ANY value of the movements >= to 10% of the loanAmount you request:
  // So, we use SOME method
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount / 10)
  ) {
    setTimeout(function () {
      // Add the movement: add loanAmount to the array movements
      currentAccount.movements.push(loanAmount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update the UI (with the new data)
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 1000);

    console.log('Loan approved');
  } else {
    console.log('Loan rejected');
  }

  inputLoanAmount.value = '';
});

// Close Account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(currentAccount.username);
  console.log(currentAccount.pin);

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );

    console.log(index);
    accounts.splice(index, 1);
    console.log('Account Deleted');

    // Hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log('Account invalid');
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

// Sort functionality
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);

  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2)); // it returns a new array
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice());

// SPLICE
console.log('-----SPLICE -----');
// console.log(arr.splice(2));
// console.log(arr);
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1, 2); // Elimina, extrae los elementos de la posicion 1 que cantidad? 2 elementos
console.log(arr);

// REVERSE
console.log('-----REVERSE -----');
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
console.log('-----CONCAT -----');
const letters = arr.concat(arr2);
console.log(letters);
// other solution is with the spread operator:
console.log([...arr, ...arr2]);

// JOIN
console.log('----- JOIN -----');
console.log(letters.join(' - ')); //ponemos todos los elementos del arreglo letters juntos separados por -

// AT
console.log('----- AT -----');
const arr3 = [23, 11, 64];
console.log(arr3[0]); // get the first elementt
console.log(arr3.at(0)); // get the first element
console.log(arr3.slice(-1)); //get the last item but it shows in array [64]
console.log(arr3.slice(-1)[0]); //adding [0] convierte  [64] a 64
console.log(arr3.at(-1)); // get the last item. The output is 64

// forEACH
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements2) {
for (const [i, movement] of movements2.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i}. You deposited ${movement}`);
  } else {
    console.log(`Movement ${i}. You widhdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH -----');
movements2.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index}. You deposited ${movement}`);
  } else {
    console.log(`Movement ${index}. You widhdrew ${Math.abs(movement)}`);
  }
});

// forEach WITH MAPS AND SETS
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// Map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const euroToUsd = 1.1;

// Using e - function (callback function)
const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * euroToUsd);
}
console.log(movementsUSDfor);

// Using array function
const movementsUSD2 = movements.map(mov => mov * euroToUsd);

console.log(movementsUSD2);

// Map has access to the index, and the all array as well
const movementDescriptions = movements.map(
  (mov, index, arr) =>
    `Movement ${index + 1}. You ${
      mov > 0 ? 'deposited' : 'widhdrew'
    } ${Math.abs(mov)}`
);

console.log(movementDescriptions);

// FILTER using regular function
const deposits = movements.filter(function (mov) {
  return mov > 0; //return true
});

// FILTER using arrow function: Get all the withdrawals
const withdrawals = movements.filter(mov => mov < 0);

console.log(deposits);
console.log(withdrawals);
console.log(movements);

// REDUCE, accumulator is like a snowball. Reduce loop the array "movements"
const balance = movements.reduce(function (
  accumulator,
  currentItem,
  index,
  wholeArr
) {
  // console.log(`Iteration ${index}: ${accumulator}`);
  return accumulator + currentItem;
},
0);

console.log(balance);

// The same but using FOR
let balance2 = 0;
for (const mov of movements) {
  balance2 = balance2 + mov;
}
console.log(balance2);

// REDUCE, using array Function
const balance3 = movements.reduce(
  (accumulator, currentItem) => accumulator + currentItem,
  0
);

console.log(balance3);

// GET maximum value example = 300;
const maxMovement = movements.reduce(function (accumulator, mov) {
  if (accumulator > mov) {
    return accumulator;
  } else {
    return mov;
  }
}, movements[0]);

console.log(maxMovement);

// PIPELINE: FILTER, MAP AND REDUCE in once get total the deposits converted in USD
// const euroToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * euroToUsd)
  .map((mov, index, arr) => {
    console.log(arr);
    return mov * euroToUsd;
  })
  .reduce((accumulator, mov) => accumulator + mov, 0);

console.log(totalDepositsUSD);

// FIND function, similar a filter but FIND returns the first element which satisfy the condition. FILTER returns an array
console.log('------FIND FUNCTION-----');
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(account => account.owner === 'Jessica Davis');
console.log(account);

// INCLUDES for EQUALITY
console.log(movements);
console.log(movements.includes(-130)); // It returns TRUE if the array movements has the value -130

// SOME, we can specify a condition and it returns TRUE if there is ANY value which the condition is true
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);
console.log(movements.some(mov => mov === -130)); // Same if we do movements.includes(-130) but because the condition os === is better to use include in this case

// EVERY: all the elements has to pass the condition and it will return TRUE
console.log('------- EVERY --------');
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0)); //Valida si TODOS los movimientos fueron depositos

// Doing the same but using SEPARATE CALLBACK function
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));

// Working with NESTED arrays. We use FLAT method. flat() It only works for one level of nested
const arrNested = [[1, 2, 3], [4, 5, 6], 7, 8]; //we want only one array [1,2,3,4,5,6,7,8]
console.log(arrNested.flat());

const arrNestedDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrNestedDeep.flat(2)); // flat(2) works for two levels of nested

// Get all movements of all accounts and save it in a new array
const accountMovements = accounts.map(account => account.movements);
console.log(accountMovements); // It returns [[mov1, mov2,..][mov4,mov5, mov6,....][mov9, mov10,...]]
const allMovements = accountMovements.flat(); //But we want [mov1, mov2,...,mov4, mov5, mov6]
console.log(allMovements);

// Get total of all movements
const overalBalance = allMovements.reduce(
  (accumulator, mov) => accumulator + mov,
  0
);

console.log(overalBalance);

// FLAT Using chaining
const overalBalance2 = accounts
  .map(account => account.movements)
  .flat()
  .reduce((accumulator, currentAcc) => accumulator + currentAcc, 0);

console.log(overalBalance2);

// FLATMAP only goes with one level deep of the array
const overalBalance3 = accounts
  .flatMap(account => account.movements)
  .reduce((accumulator, currentAcc) => accumulator + currentAcc, 0);

console.log(overalBalance3);

// SORT with strings
const owners = ['Veronica', 'Amalia', 'Juan Pablo', 'Faviola'];
console.log(owners.sort());
console.log(owners); // It modify the original array

// SORT wih numbers
console.log(movements);
// console.log(movements.sort()); it doesn't work as expected

// returns < 0 if A, B (keep order)
// returns > 0 if B, A (switch order)

// // Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

// console.log(movements);

// // Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });

// console.log(movements);

// Another solution
// Ascending
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
movements.sort((a, b) => b - a);
console.log(movements);

// Creating programatically Arrays. Empty arrays + fill method
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7); //It creates an empty  array with lengh 7
console.log(x);

// console.log(x.map(()=>5)); //it doesn't work to fill the array wih value 5

// we have to use fill method
x.fill(1);
console.log(x); //[1,1,1,1,1,1,1]

// Array.from
const y = Array.from({ length: 7 }, () => 1); ////[1,1,1,1,1,1,1]
console.log(y);

// (currentElement, index) but if the parameter currentElement we don't use it, we can replace it using _:
// (_, index)
const z = Array.from({ length: 7 }, (currentElement, index) => index + 1);
console.log(z);

// Total from UI

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();

  const movementUI = Array.from(document.querySelectorAll('.movements__value'));
  console.log(movementUI);

  console.log(
    movementUI.map(element => Number(element.textContent.replace('€', '')))
  );

  // Now we can use map as second parametre of Array.from
  const movementUI2 = Array.from(
    document.querySelectorAll('.movements__value'),
    element => Number(element.textContent.replace('€', ''))
  );
  console.log(movementUI2);

  // Another way to convert to an Array using spread operator
  const movementUI3 = [...document.querySelectorAll('.movements__value')];
  console.log(movementUI3);
  console.log(
    movementUI3.map(element => Number(element.textContent.replace('€', '')))
  );
});

// Array practices
// 1.
const bankDepositSum = accounts.map(account => account.movements).flat();
console.log(bankDepositSum);

// Everytime we see map(...).flat() better to use flatMap()
const bankDepositSum2 = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov > 0)
  .reduce((sum, current) => sum + current, 0);
console.log(bankDepositSum2);

// 2. Get number of deposits > 1000
const numDeposits1000 = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

// Another solution using reduce

const numDeposits1000b = accounts
  .flatMap(account => account.movements)
  .reduce(
    (count, currentAccount) => (currentAccount >= 1000 ? count + 1 : count),
    0
  );

console.log(numDeposits1000b);

let a = 10;
console.log(a++);
console.log(a);

// Prefixed ++ operator
let b = 10;
console.log(++b);
console.log(b);

// 3. Calculate total deposits and retiros en uno solo
// destructurando seria:
// const {deposits, withdrawals}=accounts.....
// and then console.log(deposits, withdrawals)
const sums = accounts
  .flatMap(account => account.movements)
  .reduce(
    (sums, currentAccount) => {
      currentAccount > 0
        ? (sums.deposits = sums.deposits + currentAccount)
        : (sums.withdrawals = sums.withdrawals + currentAccount);

      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(sums);

// 4.
// this is a nice title => This Is a Nice Title

const convertTitleCase = function (title) {
  // The words we don't capitalize
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// NUMBERS - DATES - TIME

console.log(23 === 23.0);
console.log(0.1 + 0.2);

// Base 10: Numbers go from 0 - 9
// Base 2: Numbers go from 0 - 1

// Conversion: string to number
console.log(Number('23'));
console.log(+'23'); //Adding + before the string is to convert the string in Number

// Parsing: converting from string having extra simbols to number
console.log(Number.parseInt('30px', 10)); //30 The second parameter 10 is to definne the Base 10
console.log(Number.parseInt('e30', 10)); //NaN

console.log(Number.parseInt('2.5rem')); //2 It shows only the integer part
console.log(Number.parseFloat('2.5rem')); //2.5

// Bad way to check if a value is a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20'));
console.log(Number.isNaN(20 / 0)); //infinite

// Perfect way to checck if a value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20'));
console.log(Number.isFinite(20 / 0));

// To check if is integer
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false

// Math operations
console.log(Math.sqrt(25)); //Raiz cuadrada
console.log(25 ** (1 / 2)); // same Math.sqrt(25)
console.log(8 ** (1 / 3)); //2 => 2*2*2

console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN

console.log(Math.min(5, 18, 23, 11, 2)); //2
console.log(Math.PI * Number.parseFloat('10px') ** 2); //To calculate the area of circule of 10px (valor al cuadrado)

console.log(Math.trunc(Math.random() * 6) + 1); //numbers between 1 - 6

// To get numbers between 10 and 20 (min and max)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// Rounding integers. To remove the decimal part
console.log(Math.trunc(23.3)); //23

console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

// Math.floor is better than Math.trunc because Math.trunc doesn't work very well when numbers are negative
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //24
console.log(Math.floor('23.9')); //24

// Rounding decimals
console.log((2.7).toFixed(0)); //Add cero decimals =>3
console.log((2.7).toFixed(3)); //2.700 add ceros until to have 3 decimals
console.log((2.245).toFixed(2)); //2.25 //it retorns string
console.log(+(2.245).toFixed(2)); //2.25 it retorns number, because we convert it with +

// Remainder operator
console.log(5 % 2); // 1
console.log(5 / 2); //5 = 2 * 2 +1

console.log(8 % 3); // 2
console.log(8 / 3); //8 = 2 * 3 +2

// To check if number is even and odd. If remainder is 0 means is even number (2,4,6,8,etc)
const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  // Adding background color to the even rows on movements list
  [...document.querySelectorAll('.movements__row')].forEach(function (
    currentMov,
    index
  ) {
    if (index % 2 === 0) currentMov.style.backgroundColor = 'orangered'; //It means is even rows 0, 2, 4, 6, 8. Every 2 times do...

    if (index % 3 === 0) currentMov.style.backgroundColor = 'blue'; //0, 3, 6, 9. It means every 3 times do..
  });
});

// More about numbers
// 287,460,000,000
const diameter = 287_460_000_000; //287460000000 the _ is valid only in numbers
console.log(diameter);

const price = 345_99;
console.log(price); //34599

console.log(Number('23_000')); //NaN
console.log(parseInt('23_000')); //230

console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 - 1);

// BigInt  => n
console.log(789798989797989898989898676765434567988765494n);
console.log(BigInt(789798989797989898989898676765434567988765494));
console.log(BigInt(789798989789));
console.log(10000n + 10000n);
console.log(
  797349378493849384367809876456765345678n *
    2345678900987654323456789876543234567n
);

const huge = 5768764563456876534567886756456798786756n;
console.log(huge + 'is really big'); //adding + to concat the string the huge number is converted to string

// Dates
const now = new Date();
console.log(now);

console.log(new Date('Thu Jun 02 2022 11:12:31'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 31));

console.log(new Date(0)); //shows when Unix time
console.log(new Date(3 * 24 * 69 * 60 * 1000));

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); // day of the month
console.log(future.getDay()); // if is Thursday it returns 4
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.toISOString()); //to convert date to string
console.log(future.getTime()); //it retorns the date in milesgundos

console.log(new Date(2142253380000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

// Making calculus with Dates. Ex how many days passed between two dates
const future2 = new Date(2037, 10, 19, 15, 23);
console.log(future2); //Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time)
console.log(+future2); //2142253380000 + converts to number

// / (1000 * 60 * 60 * 24) To convert it in days
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

// Formating numbers. For example for money we need the separators and decimal separator 3,884,764.23
const num = 3884764.23;

const options = {
  style: 'currency', //percent, currency, unit
  unit: 'mile-per-hour', //celsius
  currency: 'EUR',
  // useGrouping: false, // 3884764.23
};

console.log(
  'US:              ',
  new Intl.NumberFormat('en-US', options).format(num)
); // 3,884,764.23
console.log(
  'Germany:         ',
  new Intl.NumberFormat('de-DE', options).format(num)
); // 3.884.764,23
console.log(
  'SY:              ',
  new Intl.NumberFormat('ar-SY', options).format(num)
); // ٣٬٨٨٤٬٧٦٤٫٢٣

console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language).format(num)
);

// Timers
setTimeout(() => console.log('Here is your pizza'), 3000);
console.log('waiting...');

// Show the date every second
// setInterval
setInterval(function () {
  const now = new Date();
  console.log(
    `Time: ${now.getHours()}: ${now.getMinutes()}:${now.getSeconds()}`
  );
}, 1000);
