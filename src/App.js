<<<<<<< HEAD
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Front from "./components/Front";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Result from "./components/Result";
import Navbar from "./components/Navbar";

function App() {
  // Persist login state (important fix)
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Front />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Result />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
=======
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
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
/* ✅ FIXED PROTECTED ROUTE */
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default App;
=======
export default App;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
