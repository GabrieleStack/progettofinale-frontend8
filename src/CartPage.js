// CartPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CartPage({ cart, removeFromCart, totalCartPrice }) {
  return (
    <div className="cart-page">
      <h1>Il Tuo Carrello</h1>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item._id}>
              {item.name} - €{item.price.toFixed(2)}
              <Button 
                variant="link" 
                className="text-danger"
                onClick={() => removeFromCart(item)}
              >
                Rimuovi
              </Button>
            </li>
          ))}
        </ul>
      )}
      <h2>Totale: €{totalCartPrice.toFixed(2)}</h2>
      <Button variant="primary">Procedi con l'ordine</Button>
      <br />
      <Link to="/">Torna alla Home</Link>
    </div>
  );
}

export default CartPage;
