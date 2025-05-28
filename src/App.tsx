import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import Navbar from "./components/navbar";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
