import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery, getProductById }
  from '../services/api';
import './homePage.css';

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

  async componentDidMount() {
    const categoriesArray = await getCategories();
    this.setState({ categories: categoriesArray });
  }

  addValueInput = async ({ target }) => {
    this.setState({ valueInput: target.value });
  };

  getProductsFromCategoryAndQueryAPI = async () => {
    const { valueInput } = this.state;
    this.setState({ stateCategory: false });
    const researchReturn = await getProductsFromCategoryAndQuery(valueInput, valueInput);
    if ((researchReturn === undefined) || (researchReturn.results.length === 0)) {
      this.setState({ stateResearch: true });
    } else {
      this.setState({
        list: researchReturn.results,
        stateResearch: false,
      });
    }
  };

  getProductsFromCategoryAP = async (id) => {
    const { stateCategory } = this.state;
    const productsFromCategory = await getProductById(id);
    this.setState({
      productsFromCategory: productsFromCategory.results,
      stateCategory: !stateCategory,
    });
  };

  render() {
    const { list, categories, valueInput, stateResearch, productsFromCategory, stateCategory, listShoppingCard } = this.state;
    return (
      <div className="containerGeral">
        <header className="containerHeader">
          <div className="containerSearch">
            { list && (
              <label
                htmlFor="inputSearch"
                data-testid="home-initial-message"
                className="inputSearchLabel"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
                <input
                  type="text"
                  data-testid="query-input"
                  className="inputSearch"
                  id="inputSearch"
                  value={ valueInput }
                  onChange={ this.addValueInput }
                  placeholder="Digite algum termo de pesquisa ou escolha uma categoria."
                />
              </label>) }
            <button
              type="button"
              data-testid="query-button"
              className="btnSearch"
              onClick={ this.getProductsFromCategoryAndQueryAPI }
            >
              Buscar
            </button>
          </div>
          <div className="containerBtnCart">
            <Link
              to="/shopping-card"
              data-testid="shopping-cart-button"
              className="btnCart"
            />
          </div>
        </header>
        <div className="containerCategories">
          <div>
            <h1 className="titleHeader">F</h1>
          </div>
          <h3 className="categoriesTitle">Categorias</h3>
          <div className="categoriesDiv">
            <ul className="categoriesUl">
              { categories.map((categorie) => (
                <li key={ categorie.id }>
                  <button
                    type="button"
                    data-testid="category"
                    onClick={ () => this.getProductsFromCategoryAP(categorie.id) }
                    className="categoriesLi"
                  >
                    { categorie.name }
                  </button>
                  <br />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="containerContent">
          <div>
            { listShoppingCard.length === 0 && (
              <p
                data-testid="shopping-cart-empty-message"
              >
                Seu carrinho está vazio
              </p>) }
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingCard;
