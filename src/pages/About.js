import React from "react";
import Container from "react-bootstrap/Container";
import "../App.css";

const About = () => {
  return (
    <Container>
      <h1 className="text-center py-10">À propos</h1>
      <div className="flex justify-center pl-8 pb-10">
        <div className="flex flex-wrap gap-4">
          <p>
            Bonjour à tous, Je m'appelle Guillaume Martinez, Développeur
            Javascript, Typescript, Android (Kotlin) depuis plus de 2 ans,
            j'aimerais découvrir de nouveaux challenges et intégrer vos équipes
            pour à la fois apprendre et vous aider à atteindre vos objectifs
            business.
          </p>
          <p>
            J'ai créé cette To-Do List gratuite pour aider les gens à mieux
            organiser leurs tâches quotidiennes, mais aussi pour me
            perfectionner sur des technologies comme React et AWS.
          </p>
          <p>Vous pouvez me contacter via les liens suivants :</p>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/guillaume-martinez-232602259"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mon profil LinkedIn
              </a>
            </li>
            <br />
            <li>
              <a href="mailto:guillaume.m.developer@gmail.com">
                Mon email : guillaume.m.developer@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default About;
