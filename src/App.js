import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.jsx';
import Home from './pages/Home/home.jsx';
import Footer from './components/Footer/footer.jsx';
import Historia from './pages/Historia/historia.jsx'; // Asegúrate de tener esta página creada

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<Historia />} />
        </Routes>
        <Footer /> {/* Agregamos el componente del footer */}
      </div>
    </Router>
  );
}

export default App;