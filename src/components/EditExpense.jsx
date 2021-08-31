import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Method from './Method';
import Tag from './Tag';
import { saveEditExpense } from '../actions';

class EditExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getExpense = this.getExpense.bind(this);
    this.optionsCurrency = this.optionsCurrency.bind(this);
    this.saveEditedExpense = this.saveEditedExpense.bind(this);
  }

  componentDidMount() {
    this.getExpense();
  }

  getExpense() {
    const { wallet: { idEdit, expenses } } = this.props;
    const expenseFiltered = expenses.filter((expense) => expense.id === idEdit);
    console.log(expenseFiltered[0].id);
    this.setState({
      id: expenseFiltered[0].id,
      value: expenseFiltered[0].value,
      description: expenseFiltered[0].description,
      currency: expenseFiltered[0].currency,
      method: expenseFiltered[0].method,
      tag: expenseFiltered[0].tag,
      exchangeRates: expenseFiltered[0].exchangeRates,
    });
  }

  createExpense() {
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    return expense;
  }

  currencyOptions() {
    const { wallet: { currencies } } = this.props;
    return currencies.map((currency, index) => (
      <option
        key={ index }
        value={ currency }
      >
        { currency }
      </option>
    ));
  }

  saveEditedExpense() {
    const { id } = this.state;
    const { wallet: { expenses }, saveEditedExpense } = this.props;
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    const editedExpense = this.createExpense();
    const editedExpenses = [...filteredExpenses, editedExpense];
    const sortEditedExpenses = editedExpenses.sort((a, b) => a.id - b.id);
    saveEditedExpense(sortEditedExpenses);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="form-edit-expense">
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            id="valor"
            name="value"
            min="0"
            data-testid="value-input"
            onChange={ (event) => this.handleChange(event) }
            value={ value }
          />
        </label>
        <label htmlFor="descrição">
          Descrição:
          <input
            id="descrição"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ (event) => this.handleChange(event) }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            onChange={ (event) => this.handleChange(event) }
            value={ currency }
          >
            { this.optionsCurrency() }
          </select>
        </label>
        <Method value={ method } handleChange={ this.handleChange } />
        <Tag value={ tag } handleChange={ this.handleChange } />
        <button
          type="button"
          onClick={ () => this.saveEditedExpensesWallet() }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ wallet: state.wallet });

const mapDispatchToProps = (dispatch) => ({
  saveEditedExpense: (expense) => dispatch(saveEditExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);

EditExpense.propTypes = {
  saveEditedExpense: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

EditExpense.defaultProps = {
  wallet: [],
};
