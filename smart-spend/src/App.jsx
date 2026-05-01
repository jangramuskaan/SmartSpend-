import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { ThemeProvider } from './context/ThemeContext'; // <-- ADDED THIS
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <ThemeProvider> {/* <-- ADDED THIS */}
      <AuthProvider>
        <ExpenseProvider>
          <Router>
            <div className="app-wrapper">
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/expenses" element={<ProtectedRoute><ExpenseList /></ProtectedRoute>} />
              </Routes>
            </div>
          </Router>
        </ExpenseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;