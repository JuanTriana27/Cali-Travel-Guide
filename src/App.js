import React from 'react';
import Navbar from './components/Navbar/navbar.jsx';
import Home from './pages/Home/home.jsx';
import Footer from './components/Footer/footer.jsx';
import '../src/assets/styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer /> {/* Agregamos el componente del footer */}
    </div>
  );
}

export default App;
