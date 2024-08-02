// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarLayout from './Layoutfornavbar.js';
import MainSection from './Mainsection.js';
import Info from './Info.js';
import HandleBackend from './HandleBackend.js';
import CartPage from './CartPage.js'; // Importa il nuovo componente
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [wines, setWines] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/wine');
        const data = await response.json();
        setWines(data);
      } catch (error) {
        console.error('Errore nel recupero dei dati dei vini:', error);
      }
    };

    fetchWines();
  }, []);

  const handleSearch = (query) => {
    if (query) {
      const results = wines.filter(wine =>
        wine.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addToCart = (wine) => {
    setCart([...cart, wine]);
  };

  const removeFromCart = (wine) => {
    setCart(cart.filter(item => item._id !== wine._id));
  };

  const totalCartPrice = cart.reduce((total, wine) => total + wine.price, 0);
  console.log("Total Cart Price:", totalCartPrice);

  return (
    <Router>
      <NavbarLayout onSearch={handleSearch} cartTotal={totalCartPrice} cartItems={cart} removeFromCart={removeFromCart}>
        <Routes>
          <Route path="/" element={<MainSection searchResults={searchResults} addToCart={addToCart} removeFromCart={removeFromCart} />} />
          <Route path="/info" element={<Info />} />
          <Route path="/admin" element={<HandleBackend />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} totalCartPrice={totalCartPrice} />} />
        </Routes>
      </NavbarLayout>
    </Router>
  );
}

export default App;
