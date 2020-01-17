import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';

import store from './store';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filteredProducts: [],
      size: '',
      sort: '',
      cartItems: []
    };
  }

  componentDidMount() {    
    if(localStorage.getItem('cartItems')) {
      this.setState({ 
        cartItems: JSON.parse(localStorage.getItem('cartItems'))
      });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <h1>Ecommerce Shopping Cart App</h1>
          <hr />

          <div className="row">
            <div className="col-md-8">
              <Filter 
                size={this.state.size} 
                sort={this.state.sort}
                handleChangeSize={this.handleChangeSize}
                handleChangeSort={this.handleChangeSort}
                count={this.state.filteredProducts.length} />
              
              <hr />

              <Products 
                products={this.state.filteredProducts} 
                handleAddToCart={this.handleAddToCart} />

            </div>
            <div className="col-md-4">
              <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
