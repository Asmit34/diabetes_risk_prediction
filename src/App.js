// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Front from './components/Front';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Result from './components/Result'; // Import the Result component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Result" element={<Result />} /> {/* Add route for Result */}
      </Routes>
    </Router>
  );
}

export default App;
