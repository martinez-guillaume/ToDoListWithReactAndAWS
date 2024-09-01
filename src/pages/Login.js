import React, { useState, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import pictureMultipleScreen from "../pictureMultipleScreen.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      if (response.data?.token && response.data?.user) {
        login(response.data.token, response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError("Invalid login attempt");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  });

  return (
    <div className="flex pt-20">
      {/* Formulaire */}
      <div className="w-1/2 p-8 flex items-center justify-center">
        <Form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
          <h1 className="text-center pb-5 text-md">Connexion</h1>
          <div className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez votre mot de passe"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="primary" type="submit">
              Se connecter
            </Button>
          </div>
        </Form>
      </div>

      {/* Image */}
      <div className="flex items-center justify-center">
        <img
          src={pictureMultipleScreen}
          alt="Description de l'image"
          className="object-cover w-3/4 h-auto"
        />
      </div>
    </div>
  );
};

export default Login;
