import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import SignedInPage from "./pages/signed-in";
import ProtectedRoute from "./components/auth/protected-route";
import Logout from "./pages/logout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/signed-in"
          element={
            <ProtectedRoute>
              <SignedInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
