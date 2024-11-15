import React from 'react';
import Navbar from './components/Navbar/navbar.js';
import Home from './pages/Home/home.js';
import '../src/assets/styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
