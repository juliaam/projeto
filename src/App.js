import { Navbar } from './components/Navbar/Navbar.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './Routes.js';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="mb-20">
        <Navbar />
      </div>
      <div className="pt-3 px-16">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
