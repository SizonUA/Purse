const totalBalance = document.querySelector(".total__balance"),
  totalMoneyIncome = document.querySelector(".total__money-income"),
  totalMoneyExpenses = document.querySelector(".total__money-expenses"),
  historyList = document.querySelector(".history__list"),
  operationName = document.querySelector(".operation__name"),
  operationAmount = document.querySelector(".operation__amount"),
  form = document.getElementById("form");

let dbOperation = [{
    id: "1",
    description: "Зарплата",
    amount: 30000,
  },
  {
    id: "2",
    description: "Квартплата",
    amount: -1500,
  },
  {
    id: "3",
    description: "Премия",
    amount: 10000,
  },
  {
    id: "4",
    description: "Покупки продуктов",
    amount: -1000,
  },
  {
    id: "5",
    description: "Отдых",
    amount: -1000,
  },
];

// Function
const generationId = () => `id${Math.round(Math.random() * 1e8).toString(16)}`

const renderOperation = (operation) => {
  const className =
    operation.amount < 0 ? "history__item-minus" : "history__item-plus";

  const listItem = document.createElement("li");
  listItem.classList.add("history__item");
  listItem.classList.add(className);

  listItem.innerHTML = `${operation.description}
  <span class="history__money">${operation.amount} ₴</span>
  <button class="history_delete">x</button>`;
  historyList.append(listItem);
};

const updateBalance = () => {
  const resultIncome = dbOperation
    .filter((item) => item.amount > 0)
    .reduce((result, item) => result + item.amount, 0)

  const resultExpenses = dbOperation
    .filter((item) => item.amount < 0)
    .reduce((result, item) => result + item.amount, 0)

  totalMoneyIncome.textContent = resultIncome + " ₴";
  totalMoneyExpenses.textContent = resultExpenses + " ₴";
  totalBalance.textContent = (resultIncome + resultExpenses) + " ₴";
};

const addOperation = (event) => {
  event.preventDefault();
  console.log('event: ', event);

  const operationNameValue = operationName.value,
    operationAmountValue = operationAmount.value;

  operationName.style.borderColor = "";
  operationAmount.style.borderColor = "";

  if (operationNameValue && operationAmountValue) {
    const operation = {
      id: generationId(),
      description: operationNameValue,
      amount: +operationAmountValue
    }
    dbOperation.push(operation);
    init();

  } else {
    if (!operationNameValue) operationName.style.borderColor = "red";
    if (!operationAmountValue) operationAmount.style.borderColor = "red";
  }
  operationNameValue.value = "";
  operationAmountValue.value = "";
};

const init = () => {
  historyList.textContent = "";
  dbOperation.forEach(renderOperation);
  updateBalance();
};

form.addEventListener('submit', addOperation)

init();

// 02:04:00
