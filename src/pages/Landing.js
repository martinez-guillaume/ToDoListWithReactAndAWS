import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../App.css";
import pictureRegisterCalendar from "../pictureRegisterCalendar.png";
import Footer from "../components/Footer/Footer";
import { gsap } from "gsap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faAws, faDocker, faNodeJs, faBootstrap, faDatabase, faMdb, faNode } from '@fortawesome/free-brands-svg-icons';

const Landing = () => {
  useEffect(() => {
   // Animation GSAP
   gsap.fromTo(
    "h1",
    {
      opacity: 0,
      y: -50,
      scale: 0.5
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    }
  );

  gsap.fromTo(
    "svg path",
    {
      scale: 0,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      ease: "power3.out"
    }
  );
}, []);
  return (
    <div className="text-black flex flex-col items-center justify-center pt-2">
      <div className="flex flex-col md:flex-row items-center  w-full max-w-6xl  pt-28">
        {/* Colonne gauche : Texte */}
        <div className="left-section w-full md:w-1/2 text-left pr-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Organisez enfin votre vie et votre travail.
          </h1>
          <p className="text-lg md:text-xl">
            Simplifiez-vous la vie, et celle de votre équipe avec l'application
            de task manager et de to do list préférée des utilisateurs.
          </p>
          {/* Bouton d'inscription */}
          <Link to="/register">
            <Button variant="primary">Commencer maintenant</Button>
          </Link>
        </div>

        {/* Colonne droite : Image */}
        <div className="w-full md:w-1/2 pl-20">
          <img
            src={pictureRegisterCalendar}
            alt="Task Manager App Preview"
            className="max-w-full h-auto"
          />
        </div>
      </div>
       {/* Section des Logos */}
       <div className="pt-40 pb-10">
        <h2 className="text-xl font-bold mb-6 text-center icon-gray-custom">Technologies Utilisées</h2>
        <div className="flex space-x-8 icon-gray-custom">
          <FontAwesomeIcon icon={faReact} size="3x" />
          <FontAwesomeIcon icon={faAws} size="3x" />
          <FontAwesomeIcon icon={faDocker} size="3x"/>
          <FontAwesomeIcon icon={faNode} size="3x" />
          <FontAwesomeIcon icon={faBootstrap} size="3x" />
          <FontAwesomeIcon icon={faMdb} size="3x" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
