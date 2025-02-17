// src/CartWrapper.jsx
import React from 'react';
import { CartProvider } from './Cartcontext';
import Product from '../pages/Product';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Paypalbutton from './Paypalbutton';


const Cartwrapper = () => {
  return (

    <CartProvider>
      <Routes>
        <Route path='/product' element={<Product />} />
        <Route path='/paypalbutton' element={<Paypalbutton />} /> 
      </Routes>
    </CartProvider>
  );
};

export default Cartwrapper;