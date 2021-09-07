// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const SAVE_EXCHANGE_RATE = 'SAVE_EXCHANGE_RATE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const fetchExchangesRatesApi = (expense) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((result) => result.json())
    .then((data) => {
      const newExpense = expense;
      newExpense.exchangeRates = data;
      dispatch(saveExpense(newExpense));
    })
    .catch((error) => console.log(error));
};
