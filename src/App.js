import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';
import './global.css';  // ✅ Añade esta línea
import Navbar from './components/Navbar/navbar.jsx';
import Home from './pages/Home/home.jsx';
import Footer from './components/Footer/footer.jsx';
import Historia from './pages/Historia/historia.jsx';
import Fotografias from './pages/Fotografias/fotografias.jsx';
import Contactenos from './pages/Contactenos/contactenos.jsx';
import Lugares from './pages/Lugares/lugares.jsx';
import Horarios from './pages/Horarios/horarios.jsx';
import Recorrido from './pages/Recorrido/recorridoVirtual.jsx';
import Fauna from './pages/Fauna/fauna.jsx';

// ✅ Añade este custom hook
const usePreventSelection = () => {
  React.useEffect(() => {
    const blockEvent = (e) => e.preventDefault();

    document.addEventListener('selectstart', blockEvent);
    document.addEventListener('dragstart', blockEvent);

    return () => {
      document.removeEventListener('selectstart', blockEvent);
      document.removeEventListener('dragstart', blockEvent);
    };
  }, []);
};

function App() {
  usePreventSelection();  // ✅ Activa el bloqueo aquí

  return (
    <Router>
      <div className="app-container" style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}>
        <Navbar />

        <main style={{
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/fotografias" element={<Fotografias />} />
            <Route path="/contactenos" element={<Contactenos />} />
            <Route path="/lugares" element={<Lugares />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/recorrido" element={<Recorrido />} />
            <Route path="/fauna" element={<Fauna />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;