import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RowTable from './RowTable';

class ExpenseTable extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th id="Descrição">Descrição</th>
              <th id="Tag">Tag</th>
              <th id="Método de pagamento">Método de pagamento</th>
              <th id="Valor">Valor</th>
              <th id="Moeda">Moeda</th>
              <th id="Câmbio utilizado">Câmbio utilizado</th>
              <th id="Valor convertido">Valor convertido</th>
              <th id="Moeda de conversão">Moeda de conversão</th>
              <th id="Editar/Excluir">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <RowTable
                key={ expense.id }
                expense={ expense }
              />))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps)(ExpenseTable);

ExpenseTable.propTypes = {
  expenses: PropTypes.shape({
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.number,
    currency: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
    map: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }),
};

ExpenseTable.defaultProps = {
  expenses: PropTypes.shape({
    description: '',
    tag: '',
    method: '',
    value: '',
    currency: '',
    exchangeRates: {},
  }),
};
