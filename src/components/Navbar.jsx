import React from 'react'
import { useState, useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import '../design/Navbar.css'
import { assets } from '../assets/assets.js';
import { Cartcontext } from './Cartcontext.jsx';


const Navbar = () => {

    const [ visible , setVisible] = useState(false);
    const { getCartItemCount } = useContext(Cartcontext);

  return (

    <div className = 'basenavbar'>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/Home' >Home</NavLink>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/About' >About</NavLink>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/Community' >Community Board</NavLink>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/Product' >Products</NavLink>
  <div className="cart-container">
        <NavLink onClick={() => setVisible(false)} className="linknavbar" to="/Cartpage">
          <img src={assets.shop_cart01} alt="Cart" className="cart-icon" />
          {getCartItemCount() > 0 && (
            <span className="cart-badge">{getCartItemCount()}</span>
          )}
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar