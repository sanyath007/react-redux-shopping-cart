import React, { Component } from 'react';

import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filteredProducts: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data,
          filteredProducts: data,
          size: '',
          sort: ''
        })
      });
  }

  handleAddToCart = (e, product) => {
    console.log(product)
  }

  handleChangeSize = e => {
    console.log('Size products')
    this.setState({size: e.target.value});
    this.listProducts();
  }
  
  handleChangeSort = e => {
    console.log('Sort products')
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
      <div className="Container">
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

            <Products 
              products={this.state.filteredProducts} 
              handleAddToCart={this.handleAddToCart} />
          </div>
          <div className="col-md-4">

          </div>
        </div>
      </div>
    );
  }
}

export default App;
