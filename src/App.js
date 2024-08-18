import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NewTask from './pages/NewTask';
import NavigationBar from './components/Navbar';
import RegisterForm from './pages/Register';
import LoginForm from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 
import EditTask from './pages/EditTask';

function App() {
  return (
     <Router>
       <AuthProvider>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/newtask" element={<ProtectedRoute><NewTask /></ProtectedRoute>}/>
          <Route path="/edit-task/:id" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
