import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HamburgerMenu from './components/HamburgerMenu';
import Assunto from './components/Assunto';

function App() {
  return (
    <Router>
      <div className="App">
        <HamburgerMenu />
        <Routes>
          <Route path="/assunto" element={<Assunto />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;