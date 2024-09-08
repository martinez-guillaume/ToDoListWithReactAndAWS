import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, redirectTo }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (
    isAuthenticated &&
    (redirectTo === "/login" || redirectTo === "/register" || redirectTo === "/welcome")
  ) {
    // Si l'utilisateur est authentifié et essaie d'accéder à une page publique (login/register/welcome)
    return <Navigate to="/home" />; // Redirection vers la page home
  }

  if (
    !isAuthenticated &&
    redirectTo !== "/login" &&
    redirectTo !== "/register" &&
    redirectTo !== "/welcome"
  ) {
    // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page protégée
    return <Navigate to="/welcome" />;
  }
  return children; //
};

export default ProtectedRoute;
