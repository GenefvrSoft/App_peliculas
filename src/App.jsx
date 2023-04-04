// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./paginas/Home"
import Detalles from "./paginas/Detalles"
import style from './App.module.css';
import { useState } from "react"

function App() {
  const [tema, setTema] = useState('Oscuro');
  
  return (
    <Router>
      <div className={`${style.mainStyle} ${tema === 'Claro' ? style.oscuro : style.claro}`}>
        <p 
          onClick={() => setTema(tema === 'Claro' ? 'Oscuro' : 'Claro')} 
          className={`${tema === 'Claro' ? style.oscuro : style.claro} ${style.tema}`}
        >
          Cambiar el tema a {tema === 'Claro' ? 'Claro' : 'Oscuro'}
        </p>
        <Routes>
          <Route path="/" element={ <Home /> } />  
          <Route path="/detalles" element={ <Detalles /> } />          
        </Routes>
      </div>
    </Router>
  )
}

export default App;
