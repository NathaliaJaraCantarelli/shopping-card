import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery, getProductById }
  from '../services/api';
import './shoppingCard.css';

class ShoppingCard extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      productsFromCategory: [],
      stateCategory: false,
      list: [],
      stateResearch: false,
      valueInput: '',
      listShoppingCard: [],
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

  removeItem = ({ target: { name } }) => {
    const { listShoppingCard } = this.state;
    const id = name;
    const allItems = listShoppingCard;
    const newList = allItems.map((list) => list.filter((item) => item.id !== id));
    const tiraArrayVazio = newList.filter((array) => array.length > 0);
    localStorage.setItem('listCart', JSON.stringify(tiraArrayVazio));
    this.setState({
      listShoppingCard: tiraArrayVazio,
    });
  };

  mudaQuantItem = ({ target: { name, value } }) => {
    const { listShoppingCard } = this.state;
    const id = name;
    listShoppingCard.forEach((arrItem, ind, arr) => {
      if (arrItem[0].id === id) {
        if (value === 'sum' && arrItem[0].available_quantity > arrItem.length) {
          arrItem.push(arrItem[0]);
          this.setState({ listShoppingCard: arr });
        } else if (value === 'sub' && arrItem.length > 1) {
          arrItem.shift(arrItem[0]);
          this.setState({ listShoppingCard: arr });
        }
      }
    });
  };

  render() {
    const { listShoppingCard } = this.state;
    return (
      <div className="containerGeralSC">
        <header className="containerHeaderSC">
          <div>
            <Link to="/">
              <h1 className="titleHeaderSC">.</h1>
            </Link>
          </div>
          <div className="containerBtnCartSC">
            <Link
              to="/shopping-card"
              data-testid="shopping-cart-button"
              className="btnCartSC"
            />
          </div>
        </header>
        <div className="containerContentSC">
          <div>
            { listShoppingCard.length > 0 && (
              <Link to="/checkout">
                <button
                  type="button"
                  data-testid="checkout-products"
                >
                  Finalizar compra
                </button>
              </Link>
            )}

            { listShoppingCard.length > 0 ? listShoppingCard.map((item, ind) => (

              <section
                key={ ind }
              >
                <p data-testid="shopping-cart-product-name">{item[0].title}</p>
                <img src={ item[0].thumbnail } alt={ item[0].title } />
                <p>{item[0].price}</p>
                <p data-testid="shopping-cart-product-quantity">
                  { `Quantidade ${item.length}`}
                </p>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={ this.removeItem }
                  name={ item[0].id }
                >
                  X
                </button>
                <button
                  name={ item[0].id }
                  type="button"
                  value="sum"
                  onClick={ this.mudaQuantItem }
                  data-testid="product-increase-quantity"
                >
                  +
                </button>
                <button
                  type="button"
                  name={ item[0].id }
                  value="sub"
                  onClick={ this.mudaQuantItem }
                  data-testid="product-decrease-quantity"
                >
                  -
                </button>
              </section>
            )) : (
              <p
                data-testid="shopping-cart-empty-message"
                className="shoppingCardEmptyMessageSC"
              >
                Seu carrinho está vazio
              </p>)}
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCard;
