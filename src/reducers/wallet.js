// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE,
  SAVE_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  idEdit: '',
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
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      idEdit: action.payload,
    };
  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
      edit: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
