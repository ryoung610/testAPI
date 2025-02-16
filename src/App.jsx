import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestAPI from './pages/TestAPI.jsx'
import Tesstapi from './pages/Tesstapi.jsx'
import Testpaypal from './pages/Testpaypal.jsx'
import Testlambda from './pages/Testlambda.jsx'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from './pages/About.jsx'
import Project from './pages/Project.jsx'
import Navbar from './components/Navbar.jsx'
import Product from './pages/Product.jsx'
import Home from './pages/Home.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       
      </div>
      <h1>Live, Laugh, and Love!</h1>
      <div className="card">
     
        <Testlambda />
        <Router> 
        <Navbar />
        <Routes>

        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/project' element={<Project />} />
        <Route path='/product' element={<Product />} />

        </Routes>
        </Router>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
        </p>
      </div>
    
    </>
  )
}

export default App
