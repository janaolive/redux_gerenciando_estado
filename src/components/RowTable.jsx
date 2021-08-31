import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, saveEditExpense } from '../actions';

class RowTableExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      exchangeUsed: '',
      exchangeValue: 0,
    };
    this.exchangeObject = this.exchangeObject.bind(this);
    this.exchangeName = this.exchangeName.bind(this);
    this.exchangeValue = this.exchangeValue.bind(this);
    this.stateUpdate = this.stateUpdate.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
  }

  componentDidMount() {
    this.stateUpdate();
  }

  componentDidUpdate(prevProps) {
    const { expense } = this.props;
    if (prevProps.expense !== expense) {
      this.stateUpdate();
    }
  }

  stateUpdate() {
    const exchangeObject = this.exchangeObject();
    const exchangeName = this.exchangeName(exchangeObject);
    const exchangeValue = this.exchangeValue(exchangeObject);
    console.log(exchangeObject);
    this.setState({
      exchangeUsed: exchangeName[0],
      exchangeValue,
    });
  }

  exchangeObject() {
    const { expense: { exchangeRates, currency } } = this.props;
    const exchangeObject = Object.entries(exchangeRates).filter(
      (item) => item[1].code === currency,
    );
    console.log(exchangeObject);
    return exchangeObject;
  }

  exchangeName(exchangeObject) {
    const exchangeName = exchangeObject[0][1].name;
    const exchangeUsed = exchangeName.split('/');
    console.log(exchangeUsed[0]);
    return exchangeUsed;
  }

  exchangeValue(exchangeObject) {
    const exchangeValue = exchangeObject[0][1].ask;
    return parseFloat(exchangeValue);
  }

  removeExpense(id) {
    const { expenses, removeExpense } = this.props;
    const deletedExpenseNewArray = expenses.filter((expense) => expense.id !== id);
    removeExpense(deletedExpenseNewArray);
  }

  render() {
    const { expense: { description, tag, method, value, id }, editExpense } = this.props;
    const { exchangeUsed, exchangeValue } = this.state;
    return (
      <tr>
        <td name={ description } id={ description }>{ description }</td>
        <td name={ tag } id={ tag }>{ tag }</td>
        <td name={ method } id={ method }>{ method }</td>
        <td
          id={ value }
          name={ value }
        >
          { value }
        </td>
        <td name={ exchangeUsed } id={ exchangeUsed }>{ exchangeUsed }</td>
        <td
          name={ parseFloat((exchangeValue * 100) / 100).toFixed(2) }
          id={ parseFloat((exchangeValue * 100) / 100).toFixed(2) }
        >
          { parseFloat((exchangeValue * 100) / 100).toFixed(2) }
        </td>
        <td
          name={ parseFloat((value * exchangeValue * 100) / 100).toFixed(2) }
          id={ parseFloat((value * exchangeValue * 100) / 100).toFixed(2) }
        >
          { parseFloat((value * exchangeValue * 100) / 100).toFixed(2) }
        </td>
        <td name="Real" id="Real">Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => this.removeExpense(id) }
          >
            Excluir
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => editExpense(id) }
          >
            Alterar despesa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (updatedExpenses) => dispatch(deleteExpense(updatedExpenses)),
  editExpense: (id) => dispatch(saveEditExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RowTableExpense);

RowTableExpense.propTypes = {
  editExpense: PropTypes.func.isRequired,
  expense: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  }),
  expenses: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
    filter: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }),
  removeExpense: PropTypes.func.isRequired,
};

RowTableExpense.defaultProps = {
  expense: PropTypes.shape({
    id: '',
    description: '',
    tag: '',
    method: '',
    value: '',
    currency: '',
    exchangeRates: {},
  }),
  expenses: PropTypes.shape({
    description: '',
    tag: '',
    method: '',
    value: '',
    currency: '',
    exchangeRates: {},
  }),
};
