import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SetExpense from '../components/SetExpense';
import ExpenseTable from '../components/ExpenseTable';
import EditExpense from '../components/EditExpense';

// renderização dos componentes que compoem as atividades da app.
class Wallet extends React.Component {
  render() {
    const { edit } = this.props;
    return (
      <div>
        <Header />
        { edit ? <EditExpense /> : <SetExpense /> }
        <ExpenseTable />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ edit: state.wallet.edit });

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  edit: PropTypes.bool.isRequired,
};

// Consulta sobre ProptTypes: https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html