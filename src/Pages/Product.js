import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getProductByRealId } from '../services/api';
import './product.css';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      email: '',
      rating: 0,
      textareaInpt: '',
      error: false,
      review: [],
      valid: false,
    };
  }

  componentDidMount() {
    this.getDataFromProduct();
    this.getReviews();
  }

  saveReview = () => {
    const { match: { params } } = this.props;
    const { review } = this.state;
    localStorage.setItem(params.id, JSON.stringify(review));
  };

  getReviews = () => {
    const { match: { params } } = this.props;
    const valueReview = JSON.parse(localStorage.getItem(params.id));
    if (valueReview !== null) {
      this.setState({
        review: valueReview,
      });
    }
  };

  // peguei esse regex no stackoverflow
  validator = () => {
    const { email, rating } = this.state;
    const emailValidator = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    const valor = 0;
    const ratingValidator = rating > valor;
    return emailValidator && ratingValidator;
  };

  clickButton = () => {
    const { email, rating, textareaInpt, valid, review } = this.state;
    if (valid) {
      const dadosReview = { emailR: email, textareaInptR: textareaInpt, ratingR: rating };
      review.push(dadosReview);
      this.saveReview();
      this.setState({
        email: '',
        textareaInpt: '',
        valid: false,
      });
    } else {
      this.setState({ error: true });
    }
  };

  changeValid = () => {
    if (this.validator()) {
      this.setState({
        valid: true,
      });
    } else {
      this.setState({
        valid: false,
      });
    }
  };

  handleChangeInpt = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
      error: false,
    }, () => this.changeValid());
  };

  getDataFromProduct = async () => {
    const { match: { params } } = this.props;
    const data = await getProductByRealId(params.id);
    this.setState({ data });
  };

  addCarrinho = async () => {
    const { data } = this.state;
    const productsLocalStorage = JSON.parse(localStorage.getItem('listCart'));
    if (productsLocalStorage === null) {
      localStorage.setItem('listCart', JSON.stringify([data]));
    } else {
      localStorage.setItem('listCart', JSON
        .stringify([...productsLocalStorage, data]));
    }
  };

  render() {
    const { data, email, textareaInpt, error, review } = this.state;
    return (
      <div className="containerGeralPr">
        <header className="containerHeaderPr">
          <div>
            <Link to="/">
              <h1 className="titleHeaderPr">.</h1>
            </Link>
          </div>
          <div className="containerBtnCartPr">
            <Link
              to="/shopping-card"
              data-testid="shopping-cart-button"
              className="btnCartPr"
            />
          </div>
        </header>
        <div className="containerContentPr">
          <div className="productItemPr">
            <h2 data-testid="product-detail-name">{data.title}</h2>
            <img
              src={ data.thumbnail }
              data-testid="product-detail-image"
              alt="Foto do Produto"
              className="imgPr"
            />
            <p data-testid="product-detail-price">{` Preço: ${data.price} R$`}</p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              className="btnAddPr"
              onClick={ this.addCarrinho }
            >
              Adicionar ao carrinho
            </button>
          </div>
          <div className="containerFormPr">
            <form>
              <input
                data-testid="product-detail-email"
                type="text"
                name="email"
                placeholder="Email"
                value={ email }
                onChange={ this.handleChangeInpt }
                className="inputEmailPr"
              />
              <label htmlFor="rating1">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  id="rating1"
                  onChange={ this.handleChangeInpt }
                  data-testid="1-rating"
                  className="inputRate"
                />
                1
              </label>
              <label htmlFor="rating2">
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  id="rating2"
                  onChange={ this.handleChangeInpt }
                  data-testid="2-rating"
                  className="inputRate"
                />
                2
              </label>
              <label htmlFor="rating3">
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  id="rating3"
                  onChange={ this.handleChangeInpt }
                  data-testid="3-rating"
                  className="inputRate"
                />
                3
              </label>
              <label htmlFor="rating4">
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  id="rating4"
                  onChange={ this.handleChangeInpt }
                  data-testid="4-rating"
                  className="inputRate"
                />
                4
              </label>
              <label htmlFor="rating5">
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  id="rating5"
                  onChange={ this.handleChangeInpt }
                  data-testid="5-rating"
                  className="inputRate"
                />
                5
              </label>
              <br />
              <textarea
                data-testid="product-detail-evaluation"
                placeholder="Mensagem detalhada (opcional)"
                name="textareaInpt"
                value={ textareaInpt }
                onChange={ this.handleChangeInpt }
                className="txtInputPr"
              />
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ this.clickButton }
                className="btnRatePr"
              >
                Avaliar
              </button>
              {error && <p data-testid="error-msg">Campos inválidos</p>}
            </form>
            <div>
              {review.map((valor, index) => (
                <div key={ index }>
                  <h4 data-testid="review-card-email">{valor.emailR}</h4>
                  <p data-testid="review-card-rating">{`Nota: ${valor.ratingR}`}</p>
                  <p data-testid="review-card-evaluation">{valor.textareaInptR}</p>
                </div>))}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;
