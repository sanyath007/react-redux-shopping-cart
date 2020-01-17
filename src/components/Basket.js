import React, { Component } from 'react';
import utils from '../utils';

class Basket extends Component {
  render() {
    const { cartItems, handleRemoveFromCart } = this.props;

    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? ' Basket is empty' : <div>You have {cartItems.length} products in basket.</div> }
        {cartItems.length > 0 &&
          <div>
            <ul>
              {cartItems.map(item => 
                <li key={item.id}>
                  <b>{item.title} </b>
                  x {item.count} 
                  <button
                    className="btn btn-danger" 
                    onClick={e => handleRemoveFromCart(e, item)}>
                      X
                  </button>
                </li>
              )}
            </ul>

            Total: {utils.formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
            <br />
            
            <button
              className="btn btn-warning"
              onClick={() => alert('Checkout needs to implement...')}
            >
              Checkout
            </button>
          </div>
        }
      </div>
    );
  }
}

export default Basket;
