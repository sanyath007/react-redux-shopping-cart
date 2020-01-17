import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterProducts, sortProducts } from '../actions/productActions';

class Filter extends Component {
  render() {
    const { size, sort, products, filteredProducts, sortProducts, filterProducts } = this.props;

    return (
      <div className="row">
        <div className="col-md-4">
          { filteredProducts.length } products found.
        </div>
        <div className="col-md-4">
          <label>
            Order by
            <select 
              className="form-control" 
              value={sort} 
              onChange={e => sortProducts(filteredProducts, e.target.value)}
            >
              <option value="">Select</option>
              <option value="lowest">Lowest to highest</option>
              <option value="highest">Highest to lowest</option>
            </select>
          </label>
        </div>
        <div className="col-md-4">
          <label>
            Filter size
            <select 
              className="form-control" 
              value={size} 
              onChange={e => filterProducts(products, e.target.value)}
            >
              <option value="">All</option>
              <option value="x">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  filteredProducts: state.products.filteredItems,
  size: state.products.size,
  sort: state.products.sort
});

export default connect(
  mapStateToProps,
  { filterProducts, sortProducts }
)(Filter);
