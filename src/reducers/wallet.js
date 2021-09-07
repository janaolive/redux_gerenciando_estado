// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  SAVE_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload],
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
}

export default walletReducer;
