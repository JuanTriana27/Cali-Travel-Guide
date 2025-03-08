import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar.jsx';
import Home from './pages/Home/home.jsx';
import Footer from './components/Footer/footer.jsx';
import Historia from './pages/Historia/historia.jsx';
import Fotografias from './pages/Fotografias/fotografias.jsx';

function App() {
  return (
    <Router>
      <div className="App" style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative'
      }}>
        <Navbar />
        
        {/* Contenido principal */}
        <main style={{
          flex: 1,
          
          width: '100%',
          overflowX: 'hidden'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/fotografias" element={<Fotografias />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;