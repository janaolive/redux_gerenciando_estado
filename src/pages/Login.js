import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as user from '../actions';  

// estado definido para utilização futura no estado global.
// botão entrar desabilitado para cumprir a exigencia de 6 caracteres.
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disableButton: true,
    };

    // função para atualização do estado ao digitar.
    this.handleChange = this.handleChange.bind(this);
    // função de conferendia do padrão de email
    this.checkEmail = this.checkEmail.bind(this);
    // função de conferencia da senha (qtd)
    this.checkPassword = this.checkPassword.bind(this);
  }

  // função recebe o evento da digitação e atualiza o estado local conforme usuario digita
  // o botão entrar será habilitado apenas se o campo email e senha estiverem corretamente preenchidos.

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
      disableButton: true,
    }, () => {
      if (this.checkEmail && this.checkPassword()) {
        this.setState({
          disableButton: false,
        });
      }
    });
  }

  // conferência do formato do email.
  // fonte de consulta: https://emailregex.com/
  checkEmail() {
    const { email } = this.state;
    const check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return check.test(email);
  }

  // conferência da quantidade minima de caracteres da senha.
  checkPassword() {
    const { password } = this.state;
    const minCharacters = 6;
    return (password.length >= minCharacters);
  }

  render() {
    const { email, password, disableButton } = this.state; // descontrução do estado.
    const { setEmail } = this.props; // desconstrução da props para envio do email (actions)
    return (
      <div>
        <div>
          <h1>Trybe Wallet</h1>
          <input
            name="email"
            type="text"
            data-testid="email-input"
            onChange={ (event) => this.handleChange(event) }
            value={ email }
            placeholder="Digite seu e-mail"
          />
          <input
            name="password"
            type="text"
            data-testid="password-input"
            onChange={ (event) => this.handleChange(event) }
            value={ password }
            placeholder=" Digite uma senha com no mínimo 6 caracteres"
          />
          <Link to={ { pathname: 'carteira' } }>
            <button
              disabled={ disableButton }
              type="button"
              onClick={ () => setEmail(email) }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
// formulario construido com consulta a documentação: https://pt-br.reactjs.org/docs/forms.html
const mapDispatchToProps = (dispatch) => (
  { setEmail: (email) => dispatch(user.saveEmail(email)) }
);

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};

// Consulta sobre ProptTypes: https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html