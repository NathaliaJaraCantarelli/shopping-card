import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ShoppingCard from './Pages/ShoppingCard';
import Product from './Pages/Product';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/shopping-card" component={ ShoppingCard } />
        <Route path="/product/:id" component={ Product } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
