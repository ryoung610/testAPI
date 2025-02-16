import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import '../design/Navbar.css'




const Navbar = () => {

    const [ visible , setVisible] = useState(false);


  return (

    <div className = 'basenavbar'>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/Home' >Home</NavLink>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/About' >About</NavLink>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/Project' >Projects</NavLink>
  <NavLink onClick={()=>setVisible(false)} className = 'linknavbar' to = '/Product' >Products</NavLink>

    </div>
  )
}

export default Navbar