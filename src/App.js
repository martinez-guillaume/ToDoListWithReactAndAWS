import "./App.css";
import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import NewTask from "./pages/NewTask";
import NavigationBar from "./components/Navbar";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EditTask from "./pages/EditTask";
import Landing from "./pages/Landing";
import CompletedTasks from "./pages/CompletedTasks";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <NavigationBar />
          <Routes>
           

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/newtask"
              element={
                <ProtectedRoute>
                  <NewTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-task/:id"
              element={
                <ProtectedRoute>
                  <EditTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/completed-tasks"
              element={
                <ProtectedRoute>
                  <CompletedTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-me"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute redirectTo="/register">
                  <RegisterForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute redirectTo="/login">
                  <LoginForm />
                </ProtectedRoute>
              }
            />
             <Route
              path="/"
              element={
                <ProtectedRoute redirectTo="/welcome">
                  <Landing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/welcome"
              element={
                <ProtectedRoute redirectTo="/welcome">
                  <Landing />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
