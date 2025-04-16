import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './Components/signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Razorpay from './Components/Razorpay';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/razorpay" element={<Razorpay />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
