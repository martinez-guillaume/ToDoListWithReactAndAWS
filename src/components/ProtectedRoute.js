import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, redirectTo }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (
    isAuthenticated &&
    (redirectTo === "/login" || redirectTo === "/register")
  ) {
    // Si l'utilisateur est authentifié et essaie d'accéder à une page publique (login/register)
    return <Navigate to="/home" />; // Redirection vers la page d'accueil
  }

  if (
    !isAuthenticated &&
    redirectTo !== "/login" &&
    redirectTo !== "/register"
  ) {
    // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page protégée
    return <Navigate to="/login" />;
  }
  return children; //
};

export default ProtectedRoute;
