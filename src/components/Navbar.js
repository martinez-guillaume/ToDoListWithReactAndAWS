import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../index.css'; 

const NavigationBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-10">
      <div className="container px-10">
        <Navbar.Brand as={Link} to="/">To Do List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/newtask">Nouvelle tâche</Nav.Link>
            <Nav.Link as={Link} to="/connexion">À propos</Nav.Link>
          </Nav>
          <Nav className="ml-auto flex">
            {!isAuthenticated && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
            {!isAuthenticated && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            {isAuthenticated && <Nav.Link as={Link} to="/" onClick={logout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};



export default NavigationBar;

