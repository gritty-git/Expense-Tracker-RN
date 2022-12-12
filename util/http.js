import axios from "axios";

const { DATABASE_URL } = require("./../envVariables");

export async function storeExpense(expenseData) {
  const response = await axios.post(
    DATABASE_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  //console.log(DATABASE_URL);
  const response = await axios.get(DATABASE_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(DATABASE_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(DATABASE_URL + `/expenses/${id}.json`);
}
