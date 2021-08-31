import React from 'react';
import PropTypes from 'prop-types';

class Method extends React.Component {
  render() {
    const { handleChange, value } = this.props;
    return (
      <div>
        <label htmlFor="método-de-pagamento">
          Método de Pagamento:
          <select
            id="método-de-pagamento"
            name="method"
            data-testid="method-input"
            onChange={ (event) => handleChange(event) }
            value={ value }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
          </select>
        </label>
      </div>
    );
  }
}

export default Method;

Method.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
