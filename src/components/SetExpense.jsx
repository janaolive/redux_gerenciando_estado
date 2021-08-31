import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCurrency from '../services/API';
import Method from './Method';
import Tag from './Tag';
import { saveCurrencies, fetchExchangesRatesApi } from '../actions';

class SetExpense extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.getCurrency = this.getCurrency.bind(this);
    this.currencyOptions = this.currencyOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createExpense = this.createExpense.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  // fazer a chamada da API e listagem das moedas após carregamento da página
  componentDidMount() {
    getCurrency().then((result) => this.getCurrencies(result));
  }

  getCurrencies(curr) {
    const { saveApiCurrencies } = this.props;
    const currList = Object.keys(curr).filter((curr) = curr !== 'USDT');
    saveApiCurrencies(currList);
  }

  // listar opções de moedas
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

  // atualização do state com o evento de escolha
  handleChange(target) {
    const { name, value } = target;
    this.setState({
      [name]: { value },
    });
  }

  // criação de despesa com valor, desrição,moeda e tag
  createExpense() {
    const { wallet } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const id = wallet.expenses.lenght;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    return expense;
  }

  // atualização do state com a despesa incluida ao salvar
  saveExpense() {
    const { saveExpense } = this.props;
    const actualExpense = this.createExpense();
    saveExpense(actualExpense);
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            type="number"
            id="valor"
            name="value"
            min="0"
            onChange={ (event) => this.handleChange(event) }
            value={ value }
          />
        </label>
        <label htmlFor="descrição">
          Desrição:
          <input
            id="descrição"
            type="text"
            name="description"
            onChange={ (event) => this.handleChange(event) }
            value={ description }
          />
          <label htmlFor="moeda">
            <select
              id="moeda"
              name="currency"
              onChange={ (event) => this.handleChange(event) }
              value={ currency }
            >
              { this.currencyOptions() }
            </select>
          </label>
          <Method value={ method } handleChange={ this.handleChange } />
          <Tag value={ tag } handleChange={ this.handleChange } />
          <button
            type="button"
            onClick={ () => this.saveExpense() }
          >
            Adicionar despesa:
          </button>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ wallet: state.wallet });

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(fetchExchangesRatesApi(expense)),
  saveApiCurrencies: (currencies) => dispatch(saveCurrencies(currencies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetExpense);

SetExpense.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  saveApiCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.arrayOf(
    PropTypes.string,
    PropTypes.number,
  ),
};

SetExpense.defaultProps = {
  wallet: [],
};
