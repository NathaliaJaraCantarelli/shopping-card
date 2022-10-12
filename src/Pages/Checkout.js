import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      listShoppingCard: [],
      name: '',
      email: '',
      cpf: '',
      phoneNumber: '',
      cep: '',
      address: '',
      radio: undefined,
      inputInvalid: false,
    };
  }

  componentDidMount() {
    this.getListItem();
  }

  getListItem = () => {
    const itemString = localStorage.getItem('listCart');
    if (itemString !== null) {
      const itemBreak = JSON.parse(itemString);
      const ids = itemBreak.map((item) => item.id);
      const arrayProductsNoRepeat = ids
        .filter((product, index, array) => array.indexOf(product) === index);
      const arrayFiltered = arrayProductsNoRepeat.map((id) => (
        itemBreak.filter((item) => item.id === id)
      ));
      this.setState({
        listShoppingCard: arrayFiltered,
      });
    }
  };

  finalizaForm = () => { // its about honor
    const { history } = this.props;
    const { name, email, cpf, phoneNumber,
      cep, address, radio } = this.state;
    const min = 3;
    const minCep = 8;
    const minPhone = 11;
    const nameOk = name.length > min;
    const emailOk = email.length > min;
    const cpfOk = cpf.length === minPhone;
    const phoneNumberOk = phoneNumber.length === minPhone;
    const cepOk = cep.length === minCep;
    const addressOk = address.length > min;
    const arrayValida = [nameOk,
      emailOk, cpfOk, phoneNumberOk, cepOk, addressOk, radio];
    const validaBtn = arrayValida.every((ele) => ele);
    if (!validaBtn) {
      this.setState({ inputInvalid: true });
    } else {
      this.setState({ inputInvalid: false });
      localStorage.clear();
      history.push('/');
    }
  };

  attEstado = ({ target }) => {
    const { id, type, value } = target;
    if (type === 'radio') {
      this.setState({ radio: value });
    } else {
      this.setState({ [id]: value });
    }
  };

  render() {
    const { listShoppingCard, name, email, cpf, phoneNumber,
      cep, address, inputInvalid } = this.state;
    return (
      <>
        {listShoppingCard.map((item, ind) => (
          <section
            key={ ind }
          >
            <p data-testid="shopping-cart-product-name">{item[0].title}</p>
            <img src={ item[0].thumbnail } alt={ item[0].title } />
            <p>{item[0].price}</p>
            <p data-testid="shopping-cart-product-quantity">
              { `Quantidade ${item.length}`}
            </p>
          </section>
        ))}
        { inputInvalid && <p data-testid="error-msg">Campos inválidos</p> }
        <form>
          <fieldset>
            <legend>Informações da compra</legend>
            <label htmlFor="name">
              Nome:
              {' '}
              <input
                id="name"
                type="text"
                value={ name }
                minLength={ 2 }
                data-testid="checkout-fullname"
                onChange={ this.attEstado }
                required
              />
            </label>
            <label htmlFor="email">
              E-mail:
              {' '}
              <input
                id="email"
                type="text"
                value={ email }
                data-testid="checkout-email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                onChange={ this.attEstado }
                required
              />
            </label>
            <label htmlFor="cpf">
              CPF:
              {' '}
              <input
                id="cpf"
                type="text"
                value={ cpf }
                data-testid="checkout-cpf"
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                title="Digite o CPF no formato nnn.nnn.nnn-nn"
                onChange={ this.attEstado }
                required
              />
            </label>
            <label htmlFor="phoneNumber">
              Numero de telefone:
              {' '}
              <input
                id="phoneNumber"
                type="text"
                value={ phoneNumber }
                data-testid="checkout-phone"
                onChange={ this.attEstado }
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Endereço</legend>
            <label htmlFor="cep">
              CEP:
              {' '}
              <input
                id="cep"
                type="text"
                value={ cep }
                data-testid="checkout-cep"
                onChange={ this.attEstado }
                required
              />
            </label>
            <label htmlFor="address">
              Endereço:
              {' '}
              <input
                id="address"
                type="text"
                value={ address }
                minLength={ 2 }
                data-testid="checkout-address"
                onChange={ this.attEstado }
                required
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Método de pagamento:</legend>
            <p>Selecione o método de pagamento:</p>
            {' '}
            <label htmlFor="Ticket">
              <input
                id="Ticket"
                name="radio"
                type="radio"
                value="Ticket"
                data-testid="ticket-payment"
                onChange={ this.attEstado }
              />
              Ticket
            </label>
            <label htmlFor="Visa">
              <input
                id="Visa"
                name="radio"
                type="radio"
                value="Visa"
                data-testid="visa-payment"
                onChange={ this.attEstado }
              />
              Visa
            </label>
            <label htmlFor="Master">
              <input
                id="Master"
                name="radio"
                type="radio"
                value="Master"
                data-testid="master-payment"
                onChange={ this.attEstado }
              />
              Master
            </label>
            <label htmlFor="Elo">
              <input
                id="Elo"
                name="radio"
                type="radio"
                value="Elo"
                data-testid="elo-payment"
                onChange={ this.attEstado }
              />
              Elo
            </label>
          </fieldset>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.finalizaForm }
          >
            Finalizar
          </button>
        </form>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.objectOf().isRequired,
};

export default Checkout;
