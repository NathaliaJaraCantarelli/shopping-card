import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery, getProductById }
  from '../services/api';
import './homePage.css';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      productsFromCategory: [],
      stateCategory: false,
      list: [],
      stateResearch: false,
      valueInput: '',
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
    const { list, categories, valueInput, stateResearch,
      productsFromCategory, stateCategory } = this.state;
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
                {' '}
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
          <div className="categoriesUl">
            <ul>
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
          <ul>
            {stateCategory && productsFromCategory
              .map((product) => (
                <li key={ product.id } data-testid="product">
                  <Link to={ `/product/${product.id}` } data-testid="product-detail-link">
                    {product.title}
                    {product.price}
                  </Link>
                  <img src={ product.thumbnail } alt={ product.title } />
                </li>))}
          </ul>
          { stateResearch ? <p data-testid="product">Nenhum produto foi encontrado</p> : (
            <ul>
              { list.map((item) => (
                <li key={ item.id } data-testid="product">
                  <Link to={ `/product/${item.id}` } data-testid="product-detail-link">
                    { item.title }
                    <br />
                    { item.price }
                    <br />
                    <img src={ item.thumbnail } alt={ item.title } />
                    <br />
                  </Link>
                </li>
              ))}
            </ul>)}
        </div>
      </div>
      // </>
    );
  }
}

export default HomePage;
