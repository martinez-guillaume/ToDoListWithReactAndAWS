import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewTask from './pages/NewTask';
import NavigationBar from './components/Navbar';
import RegisterForm from './pages/Register';
import LoginForm from './pages/Login';

function App() {
  return (
     <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/newtask" element={<NewTask />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <AddTaskButton/>
    </div>*/
  );
}

export default App;
