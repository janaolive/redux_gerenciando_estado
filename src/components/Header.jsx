import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      totalValue: 0, // estado local para guardar e exibir o valor total de despesas.
    };

    this.exchangeExpense = this.exchangeExpense.bind(this);
    this.createExpensesList = this.createExpensesList.bnd(this);
    this.amountExpenses = this.updateTotalValue.bind(this);
    this.updateTotalValue = this.updateTotalValue.bind(this);
  }

  // exibição do valor total após carregamento da página
  componentDidMount() {
    this.updateTotalValue();
  }

  // exibição dos valores inderidos após edição da página, se as despesas estiverem diferentes
  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    if (prevProps.expenses !== expenses) {
      this.updateTotalValue();
    }
  }

  // função para conversão de valores entre moedas
  exchangeExpense(expense) {
    // listar tarifas de conversão
    const rates = expense.exchangeRates;
    // listar moedas
    const coin = Object.entries(rates).filter((i) => i[1].code === expense.currency);
    // conversão de string para número
    const value = parseFloat(expense.value) * parseFloat(coin[0][1].ask);
    return value;
  }

  // função para criação da lista de despesas
  createExpensesList() {
    const { expenses } = this.props;
    // definição de array vazio para inclusão das despesas
    const expensesArray = [];
    expenses.map((expense) => expensesArray.push(this.exchangeExpense(expense)));
    return expensesArray;
  }

  // cálculo das despesas incluidas
  amountExpenses() {
    const { expenses } = this.createExpensesList();
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr, 0);
    return totalExpenses;
  }

  // atualização do valor total de despesas no state local
  updateTotalValue() {
    const value = this.amountExpenses();
    this.setState({
      totalValue: value,
    });
  }

  render() {
    const { userEmail } = this.props;
    const { totalValue } = this.state;
    return (
      <section>
        <div>
          <h2>Trybe Wallet</h2>
        </div>
        <div>
          <label htmlFor="email-field">
            Email:
            <span data-testid="email-field">{ userEmail }</span>
          </label>
          <div>
            <label htmlFor="total-field">
              Total de gastos: $
              <span data-testid="total-field">
                { parseFloat((totalValue * 100) / 100).toFixed(2) }
              </span>
            </label>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;

Header.propTypes = {
  userEmail: PropTypes.string,
  expenses: PropTypes.shape({
    value: PropTypes.string,
    currency: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    map: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    exchangeRates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  }),
};

Header.defaultProps = {
  userEmail: 'alguem@algo.com',
  expenses: {},
};
