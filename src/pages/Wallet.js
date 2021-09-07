import React from 'react';
import Header from '../components/Header';
import SetExpense from '../components/SetExpense';
import ExpenseTable from '../components/ExpenseTable';

// renderização dos componentes que compoem as atividades da app.
class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <SetExpense />
        <ExpenseTable />
      </div>
    );
  }
}
export default Wallet;

// Consulta sobre ProptTypes: https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
