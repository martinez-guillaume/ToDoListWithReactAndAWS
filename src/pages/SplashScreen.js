import React from 'react';
import { Button } from 'react-bootstrap';
import '../App.css'; // Importez le fichier CSS personnalisé

const SplashScreen = () => {

return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Logo et Boutons de Connexion */}
      {/* <div className="flex justify-between w-full p-4">
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-14 w-14" />
          <span className="ml-2 text-xl">TajweedPro</span>
        </div>
        <div className="flex">
          <Button className="btn-secondary">S'inscrire</Button>
          <Button className="btn-primary ml-4">Se connecter</Button>
        </div>
      </div> */}

      {/* Texte Principal */}
      {/* <div className="text-center mt-20">
        <h1 className="text-5xl font-bold">ENREGISTRER , ECOUTER , PARTAGER SANS LIMITE</h1>
        <p className="text-lg mt-4">Explorez une nouvelle dimension d'échange sonore et laissez votre voix résonner à travers le monde.</p>
      </div> */}

      {/* Image Casque */}
      {/* <div className="mt-10">
        <img src="/assets/images/headsetWhite.png" alt="Casque" className="h-60 w-60" />
      </div> */}

      {/* Boutons d'Action */}
      {/* <div className="flex mt-10">
        <Button className="btn-primary">COMMENCER</Button>
        <Button className="btn-secondary ml-4">EN SAVOIR PLUS</Button>
      </div> */}
    </div>
  );
};

export default SplashScreen;