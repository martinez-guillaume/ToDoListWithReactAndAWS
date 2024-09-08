import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import pictureRegisterCalendar from "../pictureRegisterCalendar.png";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex flex-grow pt-4">
      {/* Formulaire d'inscription */}
      <div className="w-1/2 px-3 flex items-center justify-center ml-20">
        <Form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="text-center pb-4 text-md">Inscription</h1>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrez votre mot de passe"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirmez le mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmez votre mot de passe"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="flex justify-center mt-4">
            <Button variant="primary" type="submit">
              S'inscrire
            </Button>
          </div>
          {/* Texte supplémentaire sous le bouton */}
          <div className=" mt-4 text-xs">
            <p>
              En continuant vous acceptez les{" "}
              <Link to="/terms" className="text-black hover:underline">
                {" "}
                Conditions générales{" "}
              </Link>
              et la{" "}
              <Link to="/privacy" className="text-black hover:underline">
                {" "}
                Politique de confidentialité{" "}
              </Link>{" "}
              de To Do List.
            </p>
            <hr className=" border-gray-300" />
            <p className="text-center">
              Déjà inscrit ?{" "}
              <Link to="/login" className="text-black hover:underline">
                {" "}
                Connectez-vous
              </Link>
            </p>
          </div>
        </Form>
      </div>

      {/* Image */}
      <div className="w-1/2 flex items-center justify-center mr-20">
        <img
          src={pictureRegisterCalendar}
          alt="Description de l'image"
          className="object-cover w-3/4 h-auto"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
