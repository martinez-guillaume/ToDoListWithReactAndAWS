import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css";
import ToDoListLogo from "../toDoListLogo.png";

const NavigationBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <Navbar className="bg-white text-black">
      <div className="container-fluid px-5">
        <Navbar.Brand as={Link} to="/" className="flex flex-row">
          <img src={ToDoListLogo} alt="To Do List Icon" className="h-12" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-grow-1">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/">
                  Accueil
                </Nav.Link>
                <Nav.Link as={Link} to="/newtask">
                  Nouvelle tâche
                </Nav.Link>
                <Nav.Link as={Link} to="/completed-tasks">
                  Voir les tâches terminées
                </Nav.Link>
                <Nav.Link as={Link} to="/about-me">
                  À propos
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ml-auto flex">
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/register" className="mr-4">
                S'inscrire
              </Nav.Link>
            )}
            {!isAuthenticated && (
              <Nav.Link as={Link} to="/login">
                Connexion
              </Nav.Link>
            )}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/" onClick={logout}>
                Se déconnecter
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
