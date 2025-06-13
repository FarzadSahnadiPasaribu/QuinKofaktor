import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MatrixOperations from './pages/MatrixOperations';
import DeterminantCalculator from './pages/DeterminantCalculator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/operasi" element={<MatrixOperations />} />
        <Route path="/determinan" element={<DeterminantCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
