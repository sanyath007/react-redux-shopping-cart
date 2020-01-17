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
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data,
          filteredProducts: data
        })
      });
    
    if(localStorage.getItem('cartItems')) {
      this.setState({ 
        cartItems: JSON.parse(localStorage.getItem('cartItems'))
      });
    }
  }

  handleAddToCart = (e, product) => {
    console.log('Add to cart');
    console.log(this.state);

    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(item => {
        if(item.id === product.id) {
          productAlreadyInCart = true;
          item.count++;
        }
      });
      
      if(!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }

      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log({cartItems});
      return {cartItems};
    });
  }

  handleRemoveFromCart = (e, item) => {
    console.log('Remove from cart');
    console.log(this.state);

    this.setState(state => {
      const cartItems = state.cartItems.filter(elm => elm.id !== item.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      console.log({cartItems});
      return {cartItems};
    });
  }

  handleChangeSize = e => {
    console.log('Size products');
    console.log(this.state);

    this.setState({size: e.target.value});
    this.listProducts();
  }
  
  handleChangeSort = e => {
    console.log('Sort products');
    console.log(this.state);

    this.setState({sort: e.target.value});
    this.listProducts();
  }
  
  listProducts() {
    this.setState(state => {
      if(state.sort !== '') {
        state.products.sort((a, b) => (state.sort === 'lowest') 
          ? (a.price > b.price?1:-1) 
          : (a.price < b.price?1:-1))
      } else {
        state.products.sort((a, b) => (a.id > b.id?1:-1))
      }

      if(state.size !== '') {
        return {
          filteredProducts: state.products.filter(a => 
            a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        }
      }

      return {filteredProducts: state.products}
    });
  }

  render() {
    return (
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
    );
  }
}

export default App;
