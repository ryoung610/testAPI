import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Project from './pages/Project.jsx';
import Product from './pages/Product.jsx';
import Cartwrapper from './components/Cartwrapper.jsx';
import Testlambda from './pages/Testlambda.jsx';
import { CartProvider } from './components/Cartcontext'; 
import Cartpage from './pages/Cartpage.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <CartProvider>
      <h1>Live, Laugh, and Love!</h1>
      <div className="card">
        <Testlambda />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<Project />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart/*" element={<Cartwrapper />} /> {/* ✅ Add `/*` */}
            <Route path="/cartpage" element={<Cartpage />} />
          </Routes>
        </Router>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </CartProvider>
  );
}

export default App;
