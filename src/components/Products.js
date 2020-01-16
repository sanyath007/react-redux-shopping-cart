import React, { Component } from 'react';
import utils from '../utils';

class Products extends Component {
  render() {
    const { products, handleAddToCart } = this.props;
    
    const productItems = products && products.map(product => (
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-center">
          <a href={`#${product.id}`} onClick={(e) => handleAddToCart(e, product)}>
            <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
            <p>
              {product.title}
            </p>
          </a>
          <div>
            <b>{utils.formatCurrency(product.price)}</b>
            <button onClick={(e) => handleAddToCart(e, product)} className="btn btn-primary">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="row">
        {productItems}
      </div>
    );
  }
}

export default Products;