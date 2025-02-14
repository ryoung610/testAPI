import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TestAPI from './pages/TestAPI.jsx'
import Tesstapi from './pages/Tesstapi.jsx'
import Testpaypal from './pages/Testpaypal.jsx'
import Testlambda from './pages/Testlambda.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TestAPI />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
     
        <Testlambda />
        
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
